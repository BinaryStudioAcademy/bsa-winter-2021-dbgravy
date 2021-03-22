import api from '../common/helpers/apiHelper';
import { IResource } from '../common/models/resources/IResource';
import { ICreateResource } from '../common/models/resources/ICreateResource';
import { IEditResource } from '../common/models/resources/IEditResource';
import { ITables } from '../common/models/resources/ITables';

export const getResourceById = (id: string) => api.get(`/api/resources/${id}`);

export const getResources = () => api.get<IResource[]>('/api/resources', {});

export const addResource = (resource: ICreateResource) => api.post<ICreateResource>('/api/resources', { resource });

export const testResource = (resource: ICreateResource) => api
  .post<boolean>('/api/resources/test', { resource });

export const updateResource = (resource: IEditResource) => api
  .put<ICreateResource>(`/api/resources/${resource.id}`, { resource });

export const takeResourceTables = (resource: ICreateResource) => api
  .post<ITables>('/api/resources/take', { resource });

export const delResource = (id: string) => api.delete<IResource>(`/api/resources/${id}`);
