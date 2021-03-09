import { getOsEnv } from './common/helpers/pathHelper';

export const env = {
  app: {
    server: getOsEnv('REACT_APP_SERVER')
  }
};
