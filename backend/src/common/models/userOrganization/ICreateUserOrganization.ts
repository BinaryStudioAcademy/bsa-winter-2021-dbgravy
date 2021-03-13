import { Role } from '../../enums/Role';

export interface ICreateUserOrganization {
    role: Role,
    userId: string,
    organizationId: string,
    email?: string
}
