import { IUserOrganizationResponse } from '../models/userOrganization/IUserOrganizationResponse';
import { IUserOrganization } from '../models/userOrganization/IUserOrganization';

export const formatResponse = ({
  id,
  user,
  role,
  organizationId,
  status
}: IUserOrganization): IUserOrganizationResponse => ({
  userOrganizationId: id,
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  organizationId,
  role,
  status
});
