import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = 86400;
export const expiresRefreshTokenIn = '28 days';
