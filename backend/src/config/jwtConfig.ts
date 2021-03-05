import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = '1h';
export const expiresRefreshTokenIn = '72h';
