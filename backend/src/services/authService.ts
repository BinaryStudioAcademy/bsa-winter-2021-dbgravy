import { v4 as uuidv4 } from 'uuid';
import { createAccessToken, createRefreshToken } from '../common/helpers/tokenHelper';
import { encrypt } from '../common/helpers/cryptoHelper';
import * as userRepository from '../data/repositories/userRepository';
import { IUser } from '../common/models/user/user';
import { IAuthUser } from '../common/models/user/authUser';
import { IRegisterUser } from '../common/models/user/registerUser';
import { ITokenData } from '../common/models/jwt/tokenData';
import { ITransportedUser } from '../common/models/user/transportedUser';

export const getUserDataFromToken = (data: ITokenData): Promise<ITokenData> => Promise.resolve(data);

export const refreshTokens = (user: IUser): Promise<IAuthUser> => login(user); 

export const login = async (user: IUser): Promise<IAuthUser> => {
  const { id } = user;

  delete user.password; // retrived password hash from response
  return {
    accessToken: createAccessToken(id),
    refreshToken: createRefreshToken(id),
    user: user as ITransportedUser
  } as IAuthUser;
};

export const register = async (user: IRegisterUser): Promise<IAuthUser> => {
  const { password, ...userData } = user;
  const newUser = await userRepository.addUser({
    ...userData,
    id: uuidv4(),
    password: await encrypt(password)
  });
  return login(newUser);
};
