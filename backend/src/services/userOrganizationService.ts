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
import { ITransportedUser } from '../common/models/user/ITransportedUser';

export const getUsers = async (organizationId: string): Promise<IUserOrganizationResponse[]> => {
  const users = await getCustomRepository(UserOrganizationRepository).getUsers(organizationId);
  return users.map(formatResponse);
};

export const getUserOrganization = async (organizationId: string, userId: string):
  Promise<IUserOrganizationResponse> => {
  const userOrganization = await getCustomRepository(UserOrganizationRepository)
    .getUserOrganization(organizationId, userId);
  return formatResponse(userOrganization);
};

export const createUserOrganization = async (data: ICreateUserOrganization): Promise<IUserOrganizationResponse> => {
  const user = await getCustomRepository(UserRepository).getByEmail(data.email);
  const res = await getCustomRepository(UserOrganizationRepository).addUserOrganization(user.id, data);
  // const msg = {
  //   to: data.email,
  //   subject: 'invite to organization',
  //   text: 'link to invite',
  //   html: '<a href="#">link to invite</>'
  // };
  // await sendEmail(msg);
  // Email sending throw with error 500/400
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

export const getUserCurOrganization = async (user: ITransportedUser): Promise<IUserOrganization> => {
  const { currentOrganizationId, id: userId } = user;
  const organization = await getCustomRepository(
    OrganizationRepository
  ).getById(currentOrganizationId);

  if (!organization) {
    throw new CustomError('Organization not found', 404);
  }

  const userOrganization = await getCustomRepository(
    UserOrganizationRepository
  ).getOrganizationUser(userId, organization.id);

  if (!userOrganization) {
    throw new CustomError('There is no user in organization', 404);
  }

  const { role } = userOrganization;
  const { name, id } = organization;

  const response: IUserOrganization = { role, name, id };
  return response;
};
