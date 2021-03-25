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
import { CustomError } from '../common/models/error/CustomError';
import { ITransportedUser } from '../common/models/user/ITransportedUser';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepository';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';
import { IInviteUserToOrganization } from '../common/models/userOrganization/IInviteUserToOrganization';
import { OrganizationStatus } from '../common/enums/OrganizationStatus';
import { IOrganization } from '../common/models/organization/IOrganization';
import { env } from '../env';
import { HttpStatusCode } from '../common/constants/http';

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

export const getUserOrganizations = async ({ id }: ITransportedUser): Promise<IOrganization[]> => {
  const userOrganizations = await getCustomRepository(UserOrganizationRepository)
    .getAllOrganizationsByUserId(id);
  return userOrganizations.map(userOrganization => userOrganization.organization);
};

export const createUserOrganization = async (data: ICreateUserOrganization): Promise<IUserOrganizationResponse> => {
  const user = await getCustomRepository(UserRepository).getByEmail(data.email);
  const res = await getCustomRepository(UserOrganizationRepository).addUserOrganization(user.id, data);
  const { name } = await getCustomRepository(OrganizationRepository).getById(data.organizationId);
  const inviteToken = createInviteToOrganizationToken({
    email: data.email,
    name,
    organizationId: data.organizationId });
  const msg = {
    to: data.email,
    subject: `Invite to ${name} organization`,
    text: 'Link to invite',
    html: `<a href=${env.baseUrl}/${inviteToken}>Link to invite</a>`
  };
  await sendMail(msg);
  return formatResponse(res);
};

export const updateUserOrganization = async (data: IUpdateUserOrganization): Promise<IUserOrganizationResponse> => {
  const user = await getCustomRepository(UserRepository).getById(data.userId);
  if (user.organizations.length > 0 && data.userId === user.organizations[0].createdByUserId) {
    throw new CustomError('This user is the owner of the organization', HttpStatusCode.BAD_REQUEST);
  }
  const res = await getCustomRepository(UserOrganizationRepository).updateUserOrganization(data);
  return formatResponse(res);
};

export const resendInvite = async (email: string, user: ITransportedUser) => {
  const { currentOrganizationId } = user;
  const { name } = await getCustomRepository(OrganizationRepository).getById(currentOrganizationId);
  const inviteToken = createInviteToOrganizationToken({ email, name, organizationId: currentOrganizationId });

  const msg = {
    to: email,
    subject: `Invite to ${name} organization`,
    text: 'Link to invite',
    html: `<a href=${env.baseUrl}/${inviteToken}>Link to invite</a>`
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
    throw new CustomError('Organization not found', HttpStatusCode.NOT_FOUND);
  }

  const userOrganization = await getCustomRepository(
    UserOrganizationRepository
  ).getOrganizationUser(userId, organization.id);

  if (!userOrganization) {
    throw new CustomError('There is no user in organization', HttpStatusCode.NOT_FOUND);
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
    throw new CustomError('Organization not found', HttpStatusCode.NOT_FOUND);
  }
  const userOrganizationExist = await getCustomRepository(UserOrganizationRepository)
    .getOrganizationUserByUserIdByStatus(user.id, organizationId, OrganizationStatus.ACTIVE);
  if (userOrganizationExist) {
    throw new CustomError('User already switch to this organization', HttpStatusCode.BAD_REQUEST);
  }
  await getCustomRepository(UserOrganizationRepository)
    .updateUserOrganization({
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
