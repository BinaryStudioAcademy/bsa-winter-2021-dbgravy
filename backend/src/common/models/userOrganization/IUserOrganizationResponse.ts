import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';

export interface IUserOrganizationResponse {
  userOrganizationId: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
  role: Role;
  status: OrganizationStatus;
}
