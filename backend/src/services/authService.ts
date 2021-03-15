import { v4 as uuidv4 } from 'uuid';
import { getCustomRepository } from 'typeorm';
import { createAccessToken, createRefreshToken } from '../common/helpers/tokenHelper';
import { encrypt } from '../common/helpers/cryptoHelper';
import { RefreshTokenRepository } from '../data/repositories/refreshTokenRepository';
import { UserRepository } from '../data/repositories/userRepository';
import { IAuthUser } from '../common/models/user/IAuthUser';
import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { ITokenData } from '../common/models/tokens/ITokenData';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { IRefreshToken } from '../common/models/tokens/IRefreshToken';
import { User } from '../data/entities/User';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { CustomError } from '../common/models/error/CustomError';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { Role } from '../common/enums/Role';
import { OrganizationStatus } from '../common/enums/OrganizationStatus';

const getExpiration = (): Date => {
  const date = new Date();
  const expiration = date.setDate(date.getDay() + 30);
  return new Date(expiration);
};

const saveRefreshToken = async (token: string, userId: string) => {
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.getById(userId);

  const refreshToken: IRefreshToken = {
    id: uuidv4(),
    value: token,
    expiration: getExpiration()
  };

  refreshTokenRepository.saveToken(refreshToken, user);
};

export const getUserDataFromToken = (data: ITokenData): Promise<ITokenData> => Promise.resolve(data);

export const removeToken = async (token: string): Promise<void> => {
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  await refreshTokenRepository.deleteToken(token);
};

export const login = async (
  user: ITransportedUser,
  token?: string,
  currentOrganizationId?: string
): Promise<IAuthUser> => {
  if (token) {
    await removeToken(token);
  }
  const { id } = user;
  if (currentOrganizationId) {
    await getCustomRepository(UserRepository).updateCurrentOrganizationId(id, currentOrganizationId);
    await getCustomRepository(UserOrganizationRepository).addUserOrganization(id, {
      userId: id,
      status: OrganizationStatus.ACTIVE,
      role: Role.DEVELOPER,
      organizationId: currentOrganizationId
    });
  }
  const accessToken = createAccessToken(id);
  const refreshToken = createRefreshToken(id);
  saveRefreshToken(refreshToken, id);
  const authUser: IAuthUser = {
    accessToken,
    refreshToken,
    user
  };

  return authUser;
};

export const register = async (organizationName: string, user: IRegisterUser): Promise<IAuthUser> => {
  const organization = await getCustomRepository(OrganizationRepository).getByName(organizationName);
  if (organization) {
    throw new CustomError('Organization already exists.', 400);
  }
  const userRepository = getCustomRepository(UserRepository);
  const { password, ...userData } = user;
  const newUser: IRegisterUser = {
    ...userData,
    password: await encrypt(password)
  };
  const savedUser: User = await userRepository.createUser(newUser);

  const addNewOrganization = async (name: string, createdUser: User): Promise<User> => {
    const newOrganization = await getCustomRepository(OrganizationRepository).createOrganization({
      name, createdByUserId: createdUser.id });
    await userRepository.updateUserFields({ id: createdUser.id, currentOrganizationId: newOrganization.id });
    const updatedUser = await userRepository.getById(createdUser.id);
    const role = Role.ADMIN;
    await getCustomRepository(UserOrganizationRepository).addUserOrganization(updatedUser.id, {
      role,
      userId: updatedUser.id,
      organizationId: updatedUser.currentOrganizationId,
      email: updatedUser.email,
      status: OrganizationStatus.ACTIVE
    });
    return updatedUser;
  };

  const joinInviteUserToOrganization = async (createdUser: User): Promise<User> => {
    await getCustomRepository(UserOrganizationRepository)
      .addUserOrganization(createdUser.id, {
        userId: createdUser.id,
        role: Role.DEVELOPER,
        status: OrganizationStatus.ACTIVE,
        organizationId: createdUser.currentOrganizationId
      });
    const invitedUser = await getCustomRepository(UserRepository).getById(createdUser.id);
    return invitedUser;
  };

  const newAddedUser = !userData.currentOrganizationId
    ? await addNewOrganization(organizationName, savedUser)
    : await joinInviteUserToOrganization(savedUser);

  return login(extractTransportedUser(newAddedUser));
};

export const refreshToken = (user: ITransportedUser, rt?: string): Promise<IAuthUser> => login(user, rt);
