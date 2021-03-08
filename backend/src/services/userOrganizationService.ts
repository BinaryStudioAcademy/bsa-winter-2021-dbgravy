import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepositry';
// import { ICreateOrganization } from '../common/models/user_organization/ICreateUserOrganization';

export const getUsers = async (organizationId: string) => {
  const users = await getCustomRepository(UserOrganizationRepository).getUsers(organizationId);
  return users;
};

export const createUserOrganization = async (data: any) => {
  const user = await getCustomRepository(UserRepository).getUserByEmail(data.email);
  const res = await getCustomRepository(UserOrganizationRepository).addUserOrganization(user.id, data);
  return res;
};

