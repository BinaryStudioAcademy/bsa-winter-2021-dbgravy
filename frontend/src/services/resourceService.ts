import api from '../common/helpers/apiHelper';
import TResource from '../common/models/types/TResource';
import { resourcesApiPath } from '../common/enums/ResourcesApiPath';

export const getResources = () => api.get<Promise<Array<TResource>>>(resourcesApiPath.resourcesPath);

export const getResourceById = (id: string) => api.get<Promise<TResource>>(`${resourcesApiPath.resourcesPath}${id}`);

export const testConnection = (resource: TResource) => api.post<Promise<void>>(
  resourcesApiPath.resourcesTestPath,
  resource
);

export const createResource = (resource: TResource) => api.post<Promise<TResource>>(
  resourcesApiPath.resourcesPath,
  resource
);

export const updateResource = ({ id, ...resource }: { id: string, resource: TResource }) => api.put<Promise<TResource>>(
  `${resourcesApiPath.resourcesPath}${id}`,
  resource
);

export const deleteResource = (id: string) => api.delete<Promise<void>>(`${resourcesApiPath.resourcesPath}${id}`);
