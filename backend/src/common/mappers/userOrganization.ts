
export const formatResponse = ({ user, role, organizationId, status }: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstname,
  lastName: user.lastname,
  organizationId,
  role,
  status
});
