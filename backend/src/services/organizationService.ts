import { getCustomRepository } from 'typeorm';
import { CustomError } from '../common/models/error/CustomError';
import { ICreateOrganization } from '../common/models/organization/ICreateOrganization';
import { OrganizationRepository } from '../data/repositories/organizationRepository';

export const createOrganization = (data: ICreateOrganization): Promise<any> => {
  const { name } = data;
  const organization = getCustomRepository(OrganizationRepository).getByName(name);

  if (organization) {
    throw new CustomError('Oraganization already exist!', 400);
  }
  const newOrganization = getCustomRepository(OrganizationRepository).createOrganization(data);
  if (!newOrganization) {
    throw new CustomError('Couldn\'t create new organization', 400);
  }

  // Need to create User2Organization
  return newOrganization;
};
