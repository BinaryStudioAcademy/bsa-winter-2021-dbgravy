import { OrganizationStatus } from '../../enums/OrganizationStatus';
import { Role } from '../../enums/Role';

export interface ICreateUserOrganization {
    role: Role,
    status: OrganizationStatus,
    userId: string,
    organizationId: string,
    email?: string
}
