import api from '../common/helpers/apiHelper';

export const fetchOrganization = async (userId: string, orgId: string) => {
  const response = await api.get(`/api/organization/${orgId}/user/${userId}`);
  return response;
};

export const postCreateOrganization = async (newOrganization: {name: string, createdByUserId: string}) => {
  const response = await api.post('/api/organization', newOrganization);
  return response;
};
