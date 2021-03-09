import { Roles } from '../common/enums/UserRoles';
// import api from '../common/helpers/apiHelper';

export const fetchOrganization = async (userId: string) => {
  // const response = await api.get('/api/organization/user/id');

  console.log(userId);
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
