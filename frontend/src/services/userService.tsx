// import { Roles } from '../common/enums/UserRoles';
import api from '../common/helpers/apiHelper';

export const fetchOrganization = async (userId: string, orgId: string) => {
  const response = await api.get(`/api/organization/${orgId}/user/${userId}`);

  console.log(response);
  // const response = {
  //   name: 'Microsoft:Azure',
  //   role: Roles.Admin
  // };
  return response;
};

export const postCreateOrganization = async (newOraganization: {name: string, createdByUserId: string}) => {
  const response = await api.post('/api/organization', newOraganization);
  console.log(response);
  return {
    created: true
  };
};
