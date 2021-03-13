import api from '../common/helpers/apiHelper';
import { Status } from '../common/enums/UserStatus';
import { Roles } from '../common/enums/UserRoles';

export const fetchUsers = async (id: string) => {
  const response = await api.get(`/api/user/organization/${id}`);
  return response;
};

export const sendInvite = async (data: { email: string, role: Roles, organizationId: string, status: Status }) => {
  const response = await api.post('/api/user/organization/', data);
  return response;
};

export const putUserChanges = async (data: { userId: string, status?: Status, organizationId: string }) => {
  const response = await api.put('/api/user/organization/', data);
  return response;
};

export const resendInvite = async (data: { email: string, organizationId?: string }) => {
  const { email } = data;
  const response = await api.post('/api/user/organization/resend', { email });
  return response;
};

export const checkInvite = async (inviteToken: string) => {
  const response = await api.get(`/api/user/organization/invite/${inviteToken}`);
  return response;
};
