import { Role } from '../../enums/Role';
import { OrganizationStatus } from '../../enums/OrganizationStatus';

export interface IUpdateUserOrganization {
    userId: string,
    organizationId: string,
    role?: Role,
    status?: OrganizationStatus
}
