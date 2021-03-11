import api from '../common/helpers/apiHelper';
import { IResource } from '../common/models/resources/IResource';
// import TResource from '../common/models/types/TResource';

export const getResourceById = (id: string) => api.get(`/api/resources${id}`);

export const getResources = () => api.get<IResource[]>('/api/resources', {});
