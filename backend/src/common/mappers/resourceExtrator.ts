import { Resource } from '../../data/entities/Resource';
import { ITransportedResource } from '../models/resource/ITransportedResource';

export const extractTransportedResource = (resource: Resource): ITransportedResource => {
  const { id, createdAt, updatedAt, name, type, host, port, dbName, dbUserName, dbPassword, organizationId } = resource;
  const transportedResource: ITransportedResource = {
    id,
    createdAt,
    updatedAt,
    name,
    type,
    host,
    port,
    dbName,
    dbUserName,
    dbPassword,
    organizationId
  };
  return transportedResource;
};

export const extractTransportedResources = (resources: Resource[]): ITransportedResource[] => (
  resources.map((resource: Resource) => extractTransportedResource(resource)));
