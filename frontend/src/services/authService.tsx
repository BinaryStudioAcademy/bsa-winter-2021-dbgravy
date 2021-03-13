import api from '../common/helpers/apiHelper';
import { IRegisterUser } from '../common/models/auth/IRegisterUser';
import { ILoginUser } from '../common/models/auth/ILoginUser';
import { IAuthServerResponse } from '../common/models/auth/AuthServerResponse';

export const login = async ({ email, password, currentOrganizationId }: ILoginUser) => {
  const payload = {
    email,
    password,
    currentOrganizationId
  };
  const response = await api.post<IAuthServerResponse>('/api/auth/sign-in', payload);
  return response;
};

export const registration = async (
  { email, password, firstName, lastName, organisationName, currentOrganizationId }: IRegisterUser
) => {
  const body = currentOrganizationId
    ? { email,
      password,
      firstName,
      lastName,
      currentOrganizationId }
    : { email, password, firstName, lastName };
  const response = await api.post('/api/auth/sign-up', body);
  return response;
};

export const fetchUser = async () => {
  const response = await api.get<IAuthServerResponse>('/api/users/me');
  return response;
};

export const removeToken = async (token: string | null) => {
  const response = await api.delete<IAuthServerResponse>('/api/auth/tokens', { token });
  return response;
};
