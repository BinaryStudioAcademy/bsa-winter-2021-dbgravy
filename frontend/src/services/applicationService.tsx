import api from '../common/helpers/apiHelper';
import { IApps } from '../common/models/apps/IApps';
import { IAddComponent } from '../common/models/editor/IAddComponent';
import { IDropItem } from '../common/models/editor/IDropItem';

export const addApp = (name: string) => api.post<IApps>('/api/applications', { name });

export const getApps = () => api.get<IApps[]>('/api/applications', {});

export const deleteApp = (app: IApps) => api.delete<IApps>(`/api/applications/${app.id}`);

export const editApp = (app: IApps, data: { name: string }) => api.put<IApps>(`/api/applications/${app.id}`, data);
export const getAppById = (id:string) => api.get<IApps>(`/api/applications/${id}`);
export const getComponents = (appId: string) => api.get<IDropItem[]>(`/api/editor/${appId}`);

export const addComponent = ({
  appId,
  component }: IAddComponent) => api.post<void>('/api/editor/', { appId, component });

export const updateComponent = ({
  appId, component }: IAddComponent) => api.put<void>('/api/editor/', { appId, component });

export const deleteComponent = (id: string) => api.delete<void>(`/api/editor/${id}`);
