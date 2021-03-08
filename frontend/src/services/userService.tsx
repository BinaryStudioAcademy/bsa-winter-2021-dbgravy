import { Roles } from '../common/enums/UserRoles';
// import api from '../common/helpers/apiHelper';

export const fetchOrganization = async (data: { organizationId: string, userId: string }) => {
  // const response = await api.get('/api/organization/id/user/id');

  console.log(data);
  const response = {
    name: 'Microsoft:Azure',
    role: Roles.Admin
  };
  return response;
};

export const postCreateOrganization = async (newOraganization: {name: string}) => {
  console.log(newOraganization);
  return {
    created: true
  };
};
