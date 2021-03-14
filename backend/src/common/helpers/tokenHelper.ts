import jwt from 'jsonwebtoken';
import { secret, expiresAccessTokenIn, expiresRefreshTokenIn, expiresInviteTokenIn } from '../../config/jwtConfig';
import { IRefreshTokenData } from '../models/tokens/ITokenData';
import { IInviteUserToOrganization } from '../models/userOrganization/IInviteUserToOrganization';

export const createAccessToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresAccessTokenIn });

// eslint-disable-next-line max-len
export const createRefreshToken = (id: string): string => jwt.sign({ id }, secret, { expiresIn: expiresRefreshTokenIn });

export const createInviteToOrganizationToken = (inviteData: IInviteUserToOrganization): string => (
  jwt.sign(inviteData, secret, { expiresIn: expiresInviteTokenIn }));

// eslint-disable-next-line no-return-await
export const verifyToken = async (token: string) => await new Promise(resolve => {
  jwt.verify(token, secret, (_err, decoded) => resolve(!!decoded));
});

export const verifyInviteToken = async (token: string) => {
  const inviteData = await new Promise(resolve => {
    jwt.verify(token, secret, (_err, decoded) => resolve(decoded));
  });
  return inviteData as IInviteUserToOrganization;
};

export const extractUserIdFromTokem = (token: string) => jwt.decode(token) as IRefreshTokenData;
