import { getCustomRepository } from 'typeorm';
import { extractTransportedUser, extractTransportedUsers } from '../common/helpers/userExtractorHelper';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { User } from '../data/entities/User';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { UserRepository } from '../data/repositories/userRepository';
import { CustomError } from '../common/models/error/CustomError';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { IUserOrganization } from '../common/models/userOrganization/IOrganizationUser';

export const getUsers = async (): Promise<ITransportedUser[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const users: User[] = await userRepository.getAll();
  return extractTransportedUsers(users);
};

export const getUserById = async (id: string): Promise<ITransportedUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getById(id);
  return extractTransportedUser(user);
};

export const switchUserOrganization = async (
  organizationId: string,
  user: ITransportedUser
): Promise<IUserOrganization> => {
  const organization = await getCustomRepository(OrganizationRepository).getById(organizationId);
  if (!organization) {
    throw new CustomError('Organization not found', 404);
  }
  const { currentOrganizationId } = await getCustomRepository(UserRepository)
    .updateCurrentOrganizationId(user.id, organizationId);

  const userOrganization = await getCustomRepository(
    UserOrganizationRepository
  ).getOrganizationUser(user.id, organizationId);

  if (!userOrganization) {
    throw new CustomError('There is no user in organization', 404);
  }

  const { role } = userOrganization;
  const { name } = organization;

  const response: IUserOrganization = { role, name, id: currentOrganizationId };
  return response;
};
