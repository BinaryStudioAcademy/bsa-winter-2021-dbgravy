import api from '../common/helpers/apiHelper';
import { IRegisterUser } from '../common/models/auth/IRegister.User';
import { ILoginUser } from '../common/models/auth/ILoginUser';
import { IAuthServerResponse } from '../common/models/auth/AuthServerResponse';

type ServerResponse = IAuthServerResponse & Response;
export const login = async ({ email, password }: ILoginUser) => {
  const payload = {
    email,
    password
  };
  const response = await api.post<ServerResponse>('/api/auth/sign-in', payload);
  return response;
};

export const registration = async ({ email, password, firstName, lastName, organisationName }: IRegisterUser) => {
  const body = {
    email,
    password,
    firstName,
    lastName
  };
  const response = await api.post('/api/auth/sign-up', body);
  return response;
};

export const fetchUser = async () => {
  const response = await api.get<ServerResponse>('/api/users/me');
  return response;
};

export const removeToken = async (token: string | null) => {
  const response = await api.delete<ServerResponse>('/api/auth/tokens', { token });
  return response;
};
