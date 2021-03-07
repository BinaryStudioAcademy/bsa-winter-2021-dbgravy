import { Role } from '../../enums/Role';
import { IOrganization } from '../organization/IOrganization';

export interface ITokenData {
  userId: string
  currentOrganization: IOrganization
  role: Role
}

export interface IRefreshTokenData {
  id: string
  iat: number
  exp: number
}
