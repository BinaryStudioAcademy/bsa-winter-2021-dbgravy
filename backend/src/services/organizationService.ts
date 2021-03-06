import { getCustomRepository } from 'typeorm';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateOrganization } from '../common/models/organization/ICreateOrganization';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';

export const createOrganization = async (data: ICreateOrganization): Promise<any> => {
  const { name, createdByUserId: userId } = data;
  const organization = await getCustomRepository(OrganizationRepository).getByName(name);

  if (organization) {
    throw new CustomError('Oraganization already exist!', 400);
  }
  const newOrganization = await getCustomRepository(OrganizationRepository).createOrganization(data);
  if (!newOrganization) {
    throw new CustomError('Couldn\'t create new organization', 400);
  }
  const { id: organizationId } = newOrganization;
  const user2Organization = await getCustomRepository(UserOrganizationRepository)
    .addUserOrganizationOwner(userId, organizationId);

  if (!user2Organization) {
    throw new CustomError('Failed', 400);
  }
  return { result: true };
};
