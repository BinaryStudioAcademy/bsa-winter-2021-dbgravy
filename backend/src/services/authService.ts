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
import { sendResetPasswordMail } from './mailService';
import { Role } from '../common/enums/Role';
import { OrganizationStatus } from '../common/enums/OrganizationStatus';
import { IForgotPasswordUser } from '../common/models/user/IForgotPasswordUser';
import { HTTP_STATUS_ERROR_BAD_REQUEST, HTTP_STATUS_ERROR_NOT_FOUND } from '../common/constants/http';

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
  currentOrganizationId?: string,
  token?: string
): Promise<IAuthUser> => {
  if (token) {
    await removeToken(token);
  }
  const { id } = user;
  if (currentOrganizationId) {
    await getCustomRepository(UserRepository).updateCurrentOrganizationId(id, currentOrganizationId);
    await getCustomRepository(UserOrganizationRepository).updateUserOrganization({
      userId: id,
      organizationId: currentOrganizationId,
      status: OrganizationStatus.ACTIVE
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
    throw new CustomError('Organization already exists.', HTTP_STATUS_ERROR_BAD_REQUEST);
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
      name, createdByUserId: createdUser.id
    });
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
    await getCustomRepository(UserOrganizationRepository).updateUserOrganization({
      userId: createdUser.id,
      organizationId: createdUser.currentOrganizationId,
      status: OrganizationStatus.ACTIVE
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

export const forgotPassword = async ({ email }: IForgotPasswordUser) => {
  const { id, ...user } = await getCustomRepository(UserRepository).getByEmail(email);
  if (!id) {
    throw new CustomError('Wrong email', HTTP_STATUS_ERROR_NOT_FOUND);
  }
  await sendResetPasswordMail({
    to: email, token: createAccessToken(id)
  });
  return { ...user, id };
};

export const resetPassword = async ({ id }: { id: string }, password: string) => {
  const passwordHash = await encrypt(password);
  const user = await getCustomRepository(UserRepository).editPassword(id, passwordHash);
  return user;
};
