import api from '../common/helpers/apiHelper';
import { IResource } from '../common/models/resources/IResource';
import TResource from '../common/models/resources/TResource';

export const getResourceById = (id: string) => api.get(`/api/resources${id}`);

export const getResources = () => api.get<IResource[]>('/api/resources', {});

export const addResource = (resource: TResource) => api.post<TResource>('/api/applications', { resource });

export const updateResource = (resource: TResource) => api.put<TResource>('/api/applications', { resource });
