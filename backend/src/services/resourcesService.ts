import resourceRepository from '../../data/repositories/resourceRepository';
import IResource from '../common/models/resource/IResource';

export const getResources = () => resourceRepository.getResources();

export const getResourceById = (id: string) => resourceRepository.getResourceById(id);

export const testConnection = (resource: IResource): boolean => testConnection(resource);

export const create = async (resource: IResource) => {
  const testResult = await testConnection(resource);
  if (!testResult) throw Error('!test failed');
  return resourceRepository.create(resource);
};

export const updateResource = async (resourceId: string, resource: IResource) => {
  const testResult = await testConnection(resource);
  if (!testResult) throw Error('!test failed');
  return resourceRepository.updateById(resourceId, resource);
};

export const deleteResource = (resourceId: string) => getResourceById(resourceId);
