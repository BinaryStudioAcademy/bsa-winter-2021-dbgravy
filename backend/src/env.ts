import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT') || 3001,
    secret: getOsEnv('SECRET_KEY')
  },
  db: {
    database: getOsEnv('TYPEORM_DATABASE'),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    host: getOsEnv('TYPEORM_HOST'),
    port: getOsEnv('TYPEORM_PORT'),
    type: getOsEnv('TYPEORM_CONNECTION'),
    logging: getOsEnv('TYPEORM_LOGGING'),
    migrationsRun: getOsEnv('TYPEORM_MIGRATIONS_RUN'),
    synchronize: getOsEnv('TYPEORM_SYNCHRONIZE'),
    entities: [getOsEnv('TYPEORM_ENTITIES')],
    migrations: [getOsEnv('TYPEORM_MIGRATIONS')],
    cli: {
      migrationsDir: getOsEnv('TYPEORM_MIGRATIONS_DIR')
    }
  },
  sendGrid: {
    apiKey: getOsEnv('SENDGRID_API_KEY'),
    emailFrom: getOsEnv('SENDGRID_EMAIL_FROM')
  },
  mail: {
    mail: getOsEnv('NODEMAILER_MAIL'),
    password: getOsEnv('NODEMAIL_PASS')
  },
  baseUrl: getOsEnv('BASE_URL')

};
