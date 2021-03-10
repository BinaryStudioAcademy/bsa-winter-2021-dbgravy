import { getCustomRepository } from 'typeorm';
import { extractTransportedUser, extractTransportedUsers } from '../common/helpers/userExtractorHelper';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import { User } from '../data/entities/User';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { UserRepository } from '../data/repositories/userRepository';

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

export const switchUserOrganization = async (user: User, id: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const organizationRepository = getCustomRepository(OrganizationRepository);

  const nextUserOrganization = await organizationRepository.getById(id);

  const updatedUser = {
    ...user,
    currentOrganization: nextUserOrganization
  };

  await userRepository.updateUser(updatedUser as User);
  return nextUserOrganization;
};
