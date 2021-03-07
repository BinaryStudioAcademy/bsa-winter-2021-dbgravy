import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT') || 3001
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    emailFrom: process.env.SENDGRID_EMAIL_FROM
  }
};
