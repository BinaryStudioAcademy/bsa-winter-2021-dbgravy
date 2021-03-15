import { Roles } from '../../enums/UserRoles';
import { Status } from '../../enums/UserStatus';

export interface IUserEdit {
  id?: string,
  email?: string,
  status?: Status,
  role?: Roles,
  new?: boolean
  isLoading?: boolean,
  isFailed?: boolean
}
