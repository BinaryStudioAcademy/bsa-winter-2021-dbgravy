import api from '../common/helpers/apiHelper';
import { IApps } from '../common/models/apps/IApps';
import { IAddComponent } from '../common/models/editor/IAddComponent';
import { IAddInput } from '../common/models/editor/input/IAddInput';
import { IUpdateComponent } from '../common/models/editor/IUpdateComponent';
import { IDeleteComponent } from '../common/models/editor/IDeleteComponent';
import { IDropItem } from '../common/models/editor/IDropItem';

export const addApp = (name: string) => api.post<IApps>('/api/applications', { name });

export const getApps = () => api.get<IApps[]>('/api/applications', {});

export const deleteApp = (app: IApps) => api.delete<IApps>(`/api/applications/${app.id}`);

export const editApp = (app: IApps, data: { name: string }) => api.put<IApps>(`/api/applications/${app.id}`, data);
export const getAppById = (id: string) => api.get<IApps>(`/api/applications/${id}`);
export const getComponents = (appId: string) => api.get<IDropItem[]>(`/api/editor/${appId}`);

export const addComponent = ({
  appId,
  component
}: IAddComponent) => api.post<IDropItem>(`/api/editor/${appId}`, component);

export const addInput = (
  input: IAddInput
) => api.post<void>('/api/editor/input', { input });

export const updateComponent = ({
  component
}: IUpdateComponent) => api.put<IDropItem>(`/api/editor/${component.id}`, component);

export const deleteComponent = ({
  id
}: IDeleteComponent) => api.delete<IDropItem>(`/api/editor/${id}`);
