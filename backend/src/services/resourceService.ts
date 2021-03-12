import { getCustomRepository } from 'typeorm';
import { ResourceRepository } from '../data/repositories/resourceRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { extractTransportedResources, extractTransportedResource } from '../common/mappers/resourceExtrator';
import { ITransportedResource } from '../common/models/resource/ITransportedResource';
import { ICreateResource } from '../common/models/resource/ICreateResource';

export const getResources = async (user: ITransportedUser): Promise<ITransportedResource[]> => {
  const { currentOrganizationId } = user;
  const resources = await getCustomRepository(ResourceRepository)
    .getAllResourcesByOrganizationId(currentOrganizationId);
  if (!resources) {
    throw new CustomError('Resources not found', 404);
  }
  return extractTransportedResources(resources);
};

export const addResource = async (resourceData: ICreateResource,
  user: ITransportedUser): Promise<ITransportedResource> => {
  const { currentOrganizationId } = user;
  const { name, type, host, port, dbName, dbUserName, dbPassword } = resourceData;
  // await checkAppExistByNameByOrganizationId(name, currentOrganizationId);
  const createdResource = await getCustomRepository(ResourceRepository).addResource(
    {
      name,
      type,
      host,
      port,
      dbName,
      dbUserName,
      dbPassword,
      organizationId: currentOrganizationId
    }
  );
  return extractTransportedResource(createdResource);
};
