import jwt from 'jsonwebtoken';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn } from '../../config/jwtConfig';
import { IRefreshTokenData } from '../models/tokens/ITokenData';

export const createAccessToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresAccessTokenIn });

// eslint-disable-next-line max-len
export const createRefreshToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresRefreshTokenIn });

// eslint-disable-next-line no-return-await
export const verifyToken = async (token: string) => await new Promise(resolve => {
  jwt.verify(token, secret, (_err: any, decoded: any) => resolve(!!decoded));
});

export const extractUserIdFromTokem = (token: string) => jwt.decode(token) as IRefreshTokenData;
