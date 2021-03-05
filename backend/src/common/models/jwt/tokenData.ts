import { Roles } from '../../enums/roles';
import { IOrganization } from '../organization/organization';

export interface ITokenData {
  userId: string
  currentOrganization: IOrganization
  role: Roles
}
