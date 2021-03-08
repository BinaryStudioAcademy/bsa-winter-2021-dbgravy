import { User } from '../../data/entities/User';
import { ITransportedUser } from '../models/user/ITransportedUser';

export const extractTransportedUser = (user: User): ITransportedUser => {
  const { id, firstname, lastname, email } = user;
  const transportedUser: ITransportedUser = {
    id,
    firstname,
    lastname,
    email
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
