import api from '../common/helpers/apiHelper';
import { IResource } from '../common/models/resources/IResource';

export const getResources = () => api.get<IResource[]>('/api/resources', {});

export const delResource = (id: string) => api.delete<IResource>(`/api/resources/${id}`);

export const updateResource = (id: string, data: {}) => api.put<IResource>(`/api/resources/${id}`, data);
