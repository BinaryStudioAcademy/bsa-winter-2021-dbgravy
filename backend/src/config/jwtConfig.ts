import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = '12h';
export const expiresRefreshTokenIn = '30d';
