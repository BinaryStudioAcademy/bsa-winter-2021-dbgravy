import { env } from '../env';

export const { secret } = env.app;
export const expiresAccessTokenIn = 60;
export const expiresRefreshTokenIn = '28 days';
