import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = '15m';
export const expiresRefreshTokenIn = '28 days';
export const expiresInviteTokenIn = '1h';
