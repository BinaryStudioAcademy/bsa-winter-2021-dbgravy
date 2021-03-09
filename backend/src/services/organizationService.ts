import { getCustomRepository } from 'typeorm';
import { CustomError } from '../common/models/error/CustomError';
import { IUserOrganization } from '../common/models/user/IUserOrganization';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { UserOrganizationRepository } from '../data/repositories/userOrganizationRepository';

export const getUserOraganization = async (
  userId: string,
  organizationId: string
): Promise<any> => {
  const organization = await getCustomRepository(
    OrganizationRepository
  ).getById(organizationId);

  if (!organizationId) {
    throw new CustomError('Organization not found', 404);
  }

  const userOrganization = await getCustomRepository(
    UserOrganizationRepository
  ).getOrganizationUser(userId, organizationId);

  if (!userOrganization) {
    throw new CustomError('There isn\'t user in organization', 404);
  }

  const { role } = userOrganization;
  const { name } = organization;

  const response: IUserOrganization = { role, name };
  return response;
};

// export const createOrganization = (userId: string, organizationName: string): Promise<any> => (
//   new Promise(resolve => {
//     resolve(true);
//   })
// );
