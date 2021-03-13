import api from '../common/helpers/apiHelper';
import { IUserOrganization } from '../common/models/user/IUserOrganization';

interface IResult {
  result: boolean
}

export const fetchOrganization = async (userId: string, orgId: string) => {
  const response = await api.get<IUserOrganization>('/api/organization/user/');
  return response;
};

export const postCreateOrganization = async (newOrganization: {name: string, createdByUserId: string}) => {
  const response = await api.post<IResult>('/api/organization', newOrganization);
  return response;
};
