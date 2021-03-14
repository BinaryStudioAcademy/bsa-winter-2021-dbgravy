import api from '../common/helpers/apiHelper';
import { IApps } from '../common/models/apps/IApps';

export const addApp = (name: string) => api.post<IApps>('/api/applications', { name });

export const getApps = () => api.get<IApps[]>('/api/applications', {});
