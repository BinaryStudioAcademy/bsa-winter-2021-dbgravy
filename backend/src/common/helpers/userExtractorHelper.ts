import { User } from '../../data/entities/User';
import { ITransportedUser } from '../models/user/ITransportedUser';

export const extractTransportedUser = (user: User): ITransportedUser => {
  const { id, firstName, lastName, email } = user;
  const transportedUser: ITransportedUser = {
    id,
    firstName,
    lastName,
    email
  };
  return transportedUser;
};
