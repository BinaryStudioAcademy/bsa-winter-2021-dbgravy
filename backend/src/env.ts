import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT') || 3001,
    secret: getOsEnv('SECRET_KEY')
  }
};
