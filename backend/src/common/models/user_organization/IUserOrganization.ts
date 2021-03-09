import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';
import { IUserFileds } from './IUserFileds';

export interface IUserOrganization {
  organizationId?: string,
  role: Role,
  status: OrganizationStatus,
  user: IUserFileds
}

