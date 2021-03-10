import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';
import { IUserFields } from './IUserFields';

export interface IUserOrganization {
  id: string,
  organizationId?: string,
  role: Role,
  status: OrganizationStatus,
  user: IUserFields
}

