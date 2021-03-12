import { getCustomRepository } from 'typeorm';
import { ResourceRepository } from '../data/repositories/resourceRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { extractTransportedResources, extractTransportedResource } from '../common/mappers/resourceExtrator';
import { ITransportedResource } from '../common/models/resource/ITransportedResource';
import { ICreateResource } from '../common/models/resource/ICreateResource';
import { IEditResource } from '../common/models/resource/IEditResource';

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

export const getResourceById = async (id: string): Promise<ITransportedResource> => {
  const resource = await getCustomRepository(ResourceRepository).getResourceById(id);
  if (!resource) {
    throw new CustomError('Resource not found', 404);
  }
  return extractTransportedResource(resource);
};

export const updateResource = async (id: string, resourceData: IEditResource): Promise<ITransportedResource> => {
  const { name, type, host, port, dbName, dbUserName, dbPassword } = resourceData;
  const editedResource = await getCustomRepository(ResourceRepository).updateResource(
    id,
    {
      name,
      type,
      host,
      port,
      dbName,
      dbUserName,
      dbPassword
    }
  );
  // console.log(editedResource);
  return extractTransportedResource(editedResource);
};
