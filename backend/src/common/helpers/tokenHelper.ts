import jwt from 'jsonwebtoken';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn } from '../../config/jwtConfig';
import { ITokenData } from '../models/jwt/tokenData';

export const createAccessToken = (data: ITokenData): string => {
  const accessToken: string = jwt.sign(data, secret, { expiresIn: expiresAccessTokenIn });
  return accessToken;
};

export const refreshAccessToken = (refreshToken: string) => {
  const userData = extractUserDataFromTokem(refreshToken);
  return createAccessToken(userData);
}

export const createRefreshToken = (data: ITokenData): string => {
  const refreshToken: string = jwt.sign(data, secret, { expiresIn: expiresRefreshTokenIn });
  return refreshToken;
};

// eslint-disable-next-line no-return-await
export const verifyToken = async (token: string) => await new Promise(resolve => {
  jwt.verify(token, secret, (_err, decoded) => resolve(!!decoded));
});

export const extractUserDataFromTokem = (token: string) => {
  const userData: ITokenData = jwt.decode(token) as ITokenData;
  return userData;
};
