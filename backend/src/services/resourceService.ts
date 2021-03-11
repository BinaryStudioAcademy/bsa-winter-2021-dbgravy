import { getCustomRepository } from 'typeorm';
import { ResourceRepository } from '../data/repositories/resourceRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { extractTransportedResources } from '../common/mappers/resourceExtrator';
import { ITransportedResource } from '../common/models/resource/ITransportedResource';

export const getResources = async (user: ITransportedUser): Promise<ITransportedResource[]> => {
  const { currentOrganizationId } = user;
  const resources = await getCustomRepository(ResourceRepository)
    .getAllResourcesByOrganizationId(currentOrganizationId);
  if (!resources) {
    throw new CustomError('Resources not found', 404);
  }
  return extractTransportedResources(resources);
};
