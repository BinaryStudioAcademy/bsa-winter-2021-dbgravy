import { Roles } from '../../enums/UserRoles';

export interface IUserOrganization {
  name: string,
  role: Roles,
  isLoading?: boolean,
  isFailed?: boolean
}
