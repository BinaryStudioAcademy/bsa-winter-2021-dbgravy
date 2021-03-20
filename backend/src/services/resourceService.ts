import { getCustomRepository, createConnection } from 'typeorm';
import { ResourceRepository } from '../data/repositories/resourceRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import {
  extractTransportedResources,
  extractTransportedResource
} from '../common/mappers/resourceExtrator';
import { ITransportedResource } from '../common/models/resource/ITransportedResource';
import { ICreateResource } from '../common/models/resource/ICreateResource';
import { IEditResource } from '../common/models/resource/IEditResource';
import { HTTP_STATUS_ERROR_BAD_REQUEST, HTTP_STATUS_ERROR_NOT_FOUND } from '../common/constants/http';

export const getResources = async (user: ITransportedUser): Promise<ITransportedResource[]> => {
  const { currentOrganizationId } = user;
  const resources = await getCustomRepository(ResourceRepository)
    .getAllResourcesByOrganizationId(currentOrganizationId);
  if (!resources) {
    throw new CustomError('Resources not found', HTTP_STATUS_ERROR_NOT_FOUND);
  }
  return extractTransportedResources(resources);
};

export const checkResourceExistByNameByOrganizationId = async (name: string, organizationId: string): Promise<void> => {
  const resource = await getCustomRepository(ResourceRepository)
    .getResourceByNameByOrganizationId(name, organizationId);
  if (resource) {
    throw new CustomError('Resource name already exists', HTTP_STATUS_ERROR_BAD_REQUEST);
  }
};

export const addResource = async (resourceData: ICreateResource,
  user: ITransportedUser): Promise<ITransportedResource> => {
  const { currentOrganizationId } = user;
  const { name, type, host, port, dbName, dbUserName, dbPassword } = resourceData;
  await checkResourceExistByNameByOrganizationId(name, currentOrganizationId);
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
    throw new CustomError('Resource not found', HTTP_STATUS_ERROR_NOT_FOUND);
  }
  return extractTransportedResource(resource);
};

export const testResource = async (resourceData: ICreateResource): Promise<boolean> => {
  try {
    const connection = await createConnection({
      name: resourceData.name,
      type: resourceData.type,
      host: resourceData.host,
      port: resourceData.port,
      username: resourceData.dbUserName,
      password: resourceData.dbPassword,
      database: resourceData.dbName,
      synchronize: true,
      logging: false
    });
    const { isConnected } = connection;
    connection.close();
    return isConnected;
  } catch (error) {
    throw new CustomError('Testing failed', HTTP_STATUS_ERROR_BAD_REQUEST);
  }
};

export const updateResource = async (id: string, resourceData: IEditResource): Promise<ITransportedResource> => {
  const { name, type, host, port, dbName, dbUserName, dbPassword, organizationId } = resourceData;
  await checkResourceExistByNameByOrganizationId(name, organizationId);
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
  return extractTransportedResource(editedResource);
};

export const deleteResource = async (id: string): Promise<ITransportedResource> => {
  const result = await getCustomRepository(ResourceRepository)
    .deleteResource(id);

  return result;
};
