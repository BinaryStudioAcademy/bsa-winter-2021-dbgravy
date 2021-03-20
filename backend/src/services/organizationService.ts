import { getCustomRepository } from 'typeorm';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateOrganization } from '../common/models/organization/ICreateOrganization';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { IOrganization } from '../common/models/organization/IOrganization';
import { HTTP_STATUS_ERROR_BAD_REQUEST } from '../common/constants/http';

export const createOrganization = async (data: ICreateOrganization): Promise<any> => {
  const { name, createdByUserId: userId } = data;
  const organization = await getCustomRepository(OrganizationRepository).getByName(name);

  if (organization) {
    throw new CustomError('Organization already exist!', HTTP_STATUS_ERROR_BAD_REQUEST);
  }
  const newOrganization = await getCustomRepository(OrganizationRepository).createOrganization(data);
  if (!newOrganization) {
    throw new CustomError('Couldn\'t create new organization', HTTP_STATUS_ERROR_BAD_REQUEST);
  }
  const { id: organizationId } = newOrganization;
  const user2Organization = await getCustomRepository(UserOrganizationRepository)
    .addUserOrganizationOwner(userId, organizationId);

  if (!user2Organization) {
    throw new CustomError('Failed', HTTP_STATUS_ERROR_BAD_REQUEST);
  }
  return { result: true };
};

export const getCurrentOrganization = async (user: ITransportedUser): Promise<IOrganization> => {
  const organization = await getCustomRepository(OrganizationRepository).getById(user.currentOrganizationId);
  return organization;
};
