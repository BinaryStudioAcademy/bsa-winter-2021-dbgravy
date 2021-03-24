import { Roles } from '../../enums/UserRoles';

export interface IUserOrganization {
  id: string,
  name?: string,
  role?: Roles,
  isLoading?: boolean,
  isFailed?: boolean
}

export interface IUserNewOrganization {
  name: string;
  isLoading?: boolean;
  isFailed?: boolean;
  isSuccess?: boolean;
}
