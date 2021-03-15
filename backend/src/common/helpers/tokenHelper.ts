import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn } from '../../config/jwtConfig';
import { IRefreshTokenData } from '../models/tokens/ITokenData';
import { RefreshTokenRepository } from '../../data/repositories/refreshTokenRepository';

export const createAccessToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresAccessTokenIn });

// eslint-disable-next-line max-len
export const createRefreshToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresRefreshTokenIn });

// eslint-disable-next-line no-return-await
export const verifyToken = async (token: string) => await new Promise((resolve, reject) => {
  const res = new Promise(r => {
    r(getCustomRepository(RefreshTokenRepository).findToken(token));
  });
  res.then(r => {
    if (r) {
      jwt.verify(token, secret, (_err, decoded) => resolve(!!decoded));
    }
    reject();
  });
});

export const extractUserIdFromTokem = (token: string) => jwt.decode(token) as IRefreshTokenData;
