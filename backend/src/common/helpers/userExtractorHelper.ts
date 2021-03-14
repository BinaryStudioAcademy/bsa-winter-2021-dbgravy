import { User } from '../../data/entities/User';
import { ITransportedUser } from '../models/user/ITransportedUser';

export const extractTransportedUser = (user: User): ITransportedUser => {
  const { id, firstName, lastName, email, currentOrganizationId } = user;
  const transportedUser: ITransportedUser = {
    id,
    firstName,
    lastName,
    email,
    currentOrganizationId
  };
  return transportedUser;
};

export const extractTransportedUsers = (users: User[]): ITransportedUser[] => {
  const extractedUsers: ITransportedUser[] = [];
  users.forEach(u => {
    const extracted: ITransportedUser = extractTransportedUser(u);
    extractedUsers.push(extracted);
  });
  return extractedUsers;
};
