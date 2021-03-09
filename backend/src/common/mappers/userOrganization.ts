
export const formatResponse = ({ user, role, organizationId, status }: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  organizationId,
  role,
  status
});
