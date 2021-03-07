import api from '../common/helpers/apiHelper';
import { IApps } from '../common/models/apps/IApps';

export const addApp = (appName: string) => api.post<IApps>('/api/applications', { appName });

export const getApps = () => api.get<IApps[]>('/api/applications', {});
