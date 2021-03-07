import { v4 as uuidv4 } from 'uuid';
import { getCustomRepository } from 'typeorm';
import { createAccessToken, createRefreshToken } from '../common/helpers/tokenHelper';
import { encrypt } from '../common/helpers/cryptoHelper';
import { RefreshTokenRepository } from '../data/repositories/refreshTokenRepository';
import { UserRepository } from '../data/repositories/userRepository';
import { IAuthUser } from '../common/models/user/authUser';
import { IRegisterUser } from '../common/models/user/registerUser';
import { ITokenData } from '../common/models/tokens/tokenData';
import { ITransportedUser } from '../common/models/user/transportedUser';
import { IRefreshToken } from '../common/models/tokens/refreshToken';
import { User } from '../data/entities/User';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';

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
  console.log(user);
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

export const register = async (user: IRegisterUser): Promise<IAuthUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const { password, ...userData } = user;
  const newUser: IRegisterUser = {
    ...userData,
    password: await encrypt(password)
  };
  const savedUser: User = await userRepository.createUser(newUser);
  return login(extractTransportedUser(savedUser));
};

export const refreshToken = (user: ITransportedUser): Promise<IAuthUser> => login(user);