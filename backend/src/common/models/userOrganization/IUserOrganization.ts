import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';
import { IUserFields } from './IUserFields';
import { IOrganization } from '../organization/IOrganization';

export interface IUserOrganization {
  id: string,
  organizationId?: string,
  role: Role,
  status: OrganizationStatus,
  user: IUserFields,
  organization?: IOrganization,
}

