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
  const response = await api.post<ServerResponse>('/api/auth/login', payload);
  return response;
};

export const registration = async ({ email, password, fullName, organisationName }: IRegisterUser) => {
  const userData = {
    user: {
      email,
      password,
      fullName,
      organisationName
    }
  };
  const response = await api.post('/api/auth/register', userData);
  return response;
};

export const fetchUser = async () => {
  const response = await api.get<ServerResponse>('/api/auth/me');
  return response;
};

export const removeToken = async (token: string | null) => {
  const response = await api.delete<ServerResponse>('/api/auth/tokens', { token });
  return response;
};
