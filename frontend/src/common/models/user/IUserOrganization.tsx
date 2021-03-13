import { Roles } from '../../enums/UserRoles';

export interface IUserOrganization {
  name?: string,
  role?: Roles,
  isLoading?: boolean,
  isFailed?: boolean
}

export interface IUserNewOrganization {
  name: string;
  isLoading?: boolean;
  isFailed?: boolean;
}
