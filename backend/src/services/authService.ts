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

export const login = async (user: ITransportedUser): Promise<IAuthUser> => {
  const { id } = user;
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

  const newOrganization = await getCustomRepository(OrganizationRepository).createOrganization({
    name: organizationName, createdByUserId: savedUser.id });
  await userRepository.updateUserFields({ id: savedUser.id, currentOrganizationId: newOrganization.id });
  const updatedUser = await userRepository.getById(savedUser.id);
  const role = Role.ADMIN;
  await getCustomRepository(UserOrganizationRepository).addUserOrganization(updatedUser.id, {
    role,
    userId: updatedUser.id,
    organizationId: updatedUser.currentOrganizationId,
    email: updatedUser.email,
    status: OrganizationStatus.ACTIVE
  });
  return login(extractTransportedUser(updatedUser));
};

export const removeToken = async (token: any): Promise<any> => {
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const res = refreshTokenRepository.deleteToken(token);
  return res;
};

export const refreshToken = (user: ITransportedUser): Promise<IAuthUser> => login(user);
