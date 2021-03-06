import jwt from 'jsonwebtoken';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn } from '../../config/jwtConfig';

export const createAccessToken = (id: string): string => jwt.sign(id, secret, { expiresIn: expiresAccessTokenIn });

export const createRefreshToken = (id: string): string => jwt.sign(id, secret, { expiresIn: expiresRefreshTokenIn });

// eslint-disable-next-line no-return-await
export const verifyToken = async (token: string) => await new Promise(resolve => {
  jwt.verify(token, secret, (_err, decoded) => resolve(!!decoded));
});

export const extractUserIdFromTokem = (token: string): string => jwt.decode(token) as string;

export const refreshAccessToken = (refreshToken: string): string => {
  const userId = extractUserIdFromTokem(refreshToken);
  return createAccessToken(userId);
};
