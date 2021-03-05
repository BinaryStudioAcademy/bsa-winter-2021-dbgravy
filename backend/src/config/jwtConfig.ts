import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = 20;
export const expiresRefreshTokenIn = '72h';
