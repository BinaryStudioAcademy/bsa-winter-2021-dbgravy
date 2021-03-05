import jwt from 'jsonwebtoken';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn } from '../../config/jwtConfig';
import { IToken } from '../models/jwt/token';
import { ITokenData } from '../models/jwt/tokenData';

export const createAccessToken = (data: ITokenData): IToken => {
  const accessToken: IToken = {
    value: jwt.sign(data, secret, { expiresIn: expiresAccessTokenIn })
  };

  return accessToken;
};

export const createRefreshToken = (data: ITokenData): IToken => {
  const refreshToken: IToken = {
    value: jwt.sign(data, secret, { expiresIn: expiresRefreshTokenIn })
  };

  return refreshToken;
};
