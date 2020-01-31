import * as dotenv from 'dotenv';
import { getOsEnv } from './common/utils/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('APP_SERVER_PORT') || 3000
  }
};
