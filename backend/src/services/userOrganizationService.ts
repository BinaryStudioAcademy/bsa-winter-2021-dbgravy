import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../data/repositories/userRepository';
import { OrganizationRepository } from '../data/repositories/organizationRepository';
import UserOrganizationRepository from '../data/repositories/userOrganizationRepositry';
// import { sendEmail } from '../common/helpers/mailHelper';
import { sendMail } from './mailService';
import { createInviteToOrganizationToken, verifyInviteToken } from '../common/helpers/tokenHelper';
import { formatResponse } from '../common/mappers/userOrganization';
import { IUserOrganizationResponse } from '../common/models/userOrganization/IUserOrganizationResponse';
import { ICreateUserOrganization } from '../common/models/userOrganization/ICreateUserOrganization';
import { IUpdateUserOrganization } from '../common/models/userOrganization/IUpdateUserOrganization';
import { ITransportedUser } from '../common/models/user/ITransportedUser';

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
    html: '<a href="#">link to invite</a>'
  };
  // await sendEmail(msg);
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
  // const res = await sendEmail(msg);
  const res = await sendMail(msg);
  return res;
};

export const checkInviteUser = async (inviteToken: string) => {
  const data = await verifyInviteToken(inviteToken);
  return data;
};
