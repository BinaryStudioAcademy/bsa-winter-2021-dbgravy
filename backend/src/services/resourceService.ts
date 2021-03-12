import { getCustomRepository } from 'typeorm';
import { ResourceRepository } from '../data/repositories/resourceRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { extractTransportedResources } from '../common/mappers/resourceExtrator';
import { ITransportedResource } from '../common/models/resource/ITransportedResource';
import resourcesRepository from '../data/repositories/resourcesRepository';
import IResource from '../common/models/resource/IResource';
// import testConnection from '../data/testConnection';

export const getResources = async (user: ITransportedUser): Promise<ITransportedResource[]> => {
  const { currentOrganizationId } = user;
  const resources = await getCustomRepository(ResourceRepository)
    .getAllResourcesByOrganizationId(currentOrganizationId);
  if (!resources) {
    throw new CustomError('Resources not found', 404);
  }
  return extractTransportedResources(resources);
};

export const getResourceById = (id: string) => resourcesRepository.getResourceById(id);

export const testConnectionService = /* (resource: IResource) */ () => setTimeout(
  () => true,
  0
); // testConnection(resource);

export const createResource = async (resource: IResource) => resourcesRepository.create(resource); // {
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

