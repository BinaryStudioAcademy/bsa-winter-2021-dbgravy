import api from '../common/helpers/apiHelper';

export const addApp = async (appName: string) => {
  const response = await api.post('/api/applications', { appName });
  return response;
};

export const getApps = async () => {
  const response = await api.get('/api/applications', {});
  return response;
};
