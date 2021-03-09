import { IUserOrganizationResponse } from '../models/userOrganization/IUserOrganizationResponse';
import { IUserOrganization } from '../models/userOrganization/IUserOrganization';

export const formatResponse = ({
  user,
  role,
  organizationId,
  status
}: IUserOrganization): IUserOrganizationResponse => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  organizationId,
  role,
  status
});
