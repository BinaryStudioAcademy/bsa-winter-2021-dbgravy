import api from '../common/helpers/apiHelper';
import { IApps } from '../common/models/apps/IApps';

export const addApp = (name: string) => api.post<IApps>('/api/applications', { name });

export const getApps = () => api.get<IApps[]>('/api/applications', {});

export const deleteApp = (app: IApps) => api.delete<IApps>(`/api/applications/${app.id}`);

export const editApp = (app: IApps, data: { name: string }) => api.put<IApps>(`/api/applications/${app.id}`, data);

export const getComponents = (appId: string) => api.get(`/api/editor/${appId}`);

export const addComponent = ({ appId, component }: any) => api.post('/api/editor/', { appId, component });

export const updateComponent = ({ appId, component }: any) => api.put('/api/editor/', { appId, component });
