import resourcesRepository from '../data/repositories/resourcesRepository';
import IResource from '../common/models/resource/IResource';
// import testConnection from '../data/testConnection';

export const getResources = () => resourcesRepository.getResources();

export const getResourceById = (id: string) => resourcesRepository.getResourceById(id);

export const testConnectionService = /* (resource: IResource) */ () => true; // testConnection(resource);

export const create = /* async */ (resource: IResource) => resourcesRepository.create(resource); // {
// const testResult = await testConnection(resource);
// if (!testResult) throw Error('!test failed');
// return resourcesRepository.create(resource);
// };

export const updateResource = /* async */ (
  resourceId: string, resource: IResource
) => resourcesRepository.updateResourceById(resourceId, resource); // {
// const testResult = await testConnection(resource);
// if (!testResult) throw Error('!test failed');
// return resourcesRepository.updateResourceById(resourceId, resource);
// };

export const deleteResource = (resourceId: string) => getResourceById(resourceId);
