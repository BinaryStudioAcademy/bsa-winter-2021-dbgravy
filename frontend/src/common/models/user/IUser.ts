import { Roles } from '../../enums/UserRoles';
import { Status } from '../../enums/UserStatus';
import { IUserNewOrganization } from './IUserOrganization';

export interface IUser {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  organizationId?: string;
  role?: Roles;
  status?: Status;
  newOrganization?: IUserNewOrganization;
}
