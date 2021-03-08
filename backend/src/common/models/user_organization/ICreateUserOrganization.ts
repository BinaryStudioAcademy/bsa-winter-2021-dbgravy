import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';

export interface ICreateUserOrganization {
    role: Role,
    status: OrganizationStatus,
    userId: string,
    organizationId: string,
}
