import api from '../common/helpers/apiHelper';
import { IResource } from '../common/models/resources/IResource';

export const getResources = () => api.get<IResource[]>('/api/resources', {});
