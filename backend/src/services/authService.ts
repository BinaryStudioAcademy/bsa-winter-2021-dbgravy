import { v4 as uuidv4 } from 'uuid';
import { createAccessToken, createRefreshToken } from '../common/helpers/tokenHelper';
import { encrypt } from '../common/helpers/cryptoHelper';
import { IUser } from '../common/models/user/user';
import * as userRepository from '../data/repositories/userRepository';
import { IAuthUser } from '../common/models/user/authUser';
import { IRegisterUser } from '../common/models/user/registerUser';
import { ITokenData } from '../common/models/jwt/tokenData';
import { Roles } from '../common/enums/roles';

export const login = async (user: IUser): Promise<IAuthUser> => {
  const { id } = user;

  // TODO: load real info for ITokenData from DB
  const tokenData: ITokenData = { userId: id,
    currentOrganization: {
      id: '1',
      name: 'Name',
      createdBy: 'fake'
    },
    role: Roles.Developer
  };

  return {
    accessToken: createAccessToken(tokenData),
    refreshToken: createRefreshToken(tokenData),
    user: await userRepository.getById(id)
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
