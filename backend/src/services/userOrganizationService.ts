import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../data/repositories/userRepository';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { sendMail } from './mailService';
import { createInviteToOrganizationToken, verifyInviteToken } from '../common/helpers/tokenHelper';
import { formatResponse } from '../common/mappers/userOrganization';
import { IUserOrganizationResponse } from '../common/models/userOrganization/IUserOrganizationResponse';
import { ICreateUserOrganization } from '../common/models/userOrganization/ICreateUserOrganization';
import { IUpdateUserOrganization } from '../common/models/userOrganization/IUpdateUserOrganization';
import { IUserOrganization } from '../common/models/userOrganization/IOrganizationUser';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';
import { IInviteUserToOrganization } from '../common/models/userOrganization/IInviteUserToOrganization';
import { Role } from '../common/enums/Role';
import { OrganizationStatus } from '../common/enums/OrganizationStatus';

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
  const msg = {
    to: data.email,
    subject: 'invite to organization',
    text: 'link to invite',
    html: '<a href="#">link to invite</a>'
  };
  await sendMail(msg);
  return formatResponse(res);
};

export const updateUserOrganization = async (data: IUpdateUserOrganization): Promise<IUserOrganizationResponse> => {
  const res = await getCustomRepository(UserOrganizationRepository).updateUserOrganization(data);
  return formatResponse(res);
};

export const resendInvite = async (email: string, user: ITransportedUser) => {
  const { currentOrganizationId } = user;
  const { name } = await getCustomRepository(OrganizationRepository).getById(currentOrganizationId);
  const inviteToken = createInviteToOrganizationToken({ email, name, organizationId: currentOrganizationId });
  const baseUrl = 'http://localhost:3000';

  const msg = {
    to: email,
    subject: `Invite to ${name} organization`,
    text: 'Link to invite',
    html: `<a href=${baseUrl}/${inviteToken}>Link to invite</a>`
  };
  const res = await sendMail(msg);
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

export const switchUserToOrganization = async (
  organizationId: string,
  user: ITransportedUser
): Promise<ITransportedUser> => {
  const organization = await getCustomRepository(OrganizationRepository).getById(organizationId);
  if (!organization) {
    throw new CustomError('Organization not found', 404);
  }
  const userOrganizationExist = await getCustomRepository(UserOrganizationRepository)
    .getUserOrganization(organizationId, user.id);
  if (userOrganizationExist) {
    throw new CustomError('User already switch to this organization', 400);
  }
  await getCustomRepository(UserOrganizationRepository)
    .addUserOrganization(user.id, {
      role: Role.DEVELOPER,
      userId: user.id,
      organizationId,
      status: OrganizationStatus.ACTIVE
    });
  await getCustomRepository(UserRepository).updateUserFields({
    id: user.id,
    currentOrganizationId: organizationId
  });
  const switchedUser = await getCustomRepository(UserRepository).getById(user.id);
  return { ...extractTransportedUser(switchedUser), currentOrganizationId: switchedUser.currentOrganizationId };
};

export const checkInviteUser = async (inviteToken: string): Promise<IInviteUserToOrganization> => {
  const data = await verifyInviteToken(inviteToken);
  return data;
};
