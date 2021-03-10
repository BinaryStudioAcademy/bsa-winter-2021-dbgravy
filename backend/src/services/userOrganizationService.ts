import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../data/repositories/userRepository';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { sendEmail } from '../common/helpers/mailHelper';
import { formatResponse } from '../common/mappers/userOrganization';
import { IUserOrganizationResponse } from '../common/models/userOrganization/IUserOrganizationResponse';
import { ICreateUserOrganization } from '../common/models/userOrganization/ICreateUserOrganization';
import { IUpdateUserOrganization } from '../common/models/userOrganization/IUpdateUserOrganization';
import { IUserOrganization } from '../common/models/userOrganization/IOrganizationUser';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { CustomError } from '../common/models/error/CustomError';

export const getUsers = async (organizationId: string): Promise<IUserOrganizationResponse[]> => {
  const users = await getCustomRepository(UserOrganizationRepository).getUsers(organizationId);
  return users.map(formatResponse);
};

export const createUserOrganization = async (data: ICreateUserOrganization): Promise<IUserOrganizationResponse> => {
  const user = await getCustomRepository(UserRepository).getByEmail(data.email);
  const res = await getCustomRepository(UserOrganizationRepository).addUserOrganization(user.id, data);
  const msg = {
    to: data.email,
    subject: 'invite to organization',
    text: 'link to invite',
    html: '<a href="#">link to invite</>'
  };
  await sendEmail(msg);
  return formatResponse(res);
};

export const updateUserOrganization = async (data: IUpdateUserOrganization): Promise<IUserOrganizationResponse> => {
  const res = await getCustomRepository(UserOrganizationRepository).updateUserOrganization(data);
  return formatResponse(res);
};

export const resendInvite = async (email: string) => {
  const msg = {
    to: email,
    subject: 'invite to organization',
    text: 'link to invite',
    html: '<a href="#">link to invite</>'
  };
  const res = await sendEmail(msg);
  return res;
};

export const getUserOraganization = async (
  userId: string,
  organizationId: string
): Promise<IUserOrganization> => {
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
