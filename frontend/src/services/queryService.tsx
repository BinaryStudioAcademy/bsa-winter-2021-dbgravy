import api from '../common/helpers/apiHelper';
import { IQuery } from '../common/models/apps/querys';
import { ICreateQuery } from '../common/models/query/ICreateQuery';
import { IUpdateQueryName } from '../common/models/query/IUpdateQueryName';
import { IDeleteQuery } from '../common/models/query/IDeleteQuery';

export const addQuery = async ({ name, code, appId, resourceId, showConfirm, runAutomatically }:ICreateQuery) => {
  const body = {
    name,
    code,
    appId,
    resourceId,
    showConfirm,
    runAutomatically
  };
  const response = await api.post<IQuery>('/api/queries', body);
  return response;
};

export const fetchQueries = async (id:string) => {
  const response = await api.get<IQuery[]>(`/api/queries/${id}`);
  return response;
};

export const updateQuery = async ({ id, data, appId }: IUpdateQueryName) => {
  const body = {
    data,
    appId
  };
  const response = await api.put<IQuery[]>(`/api/queries/${id}`, body);
  return response;
};

export const deleteQuery = async ({ id, appId }: IDeleteQuery) => {
  const body = {
    appId
  };
  const response = await api.delete<IQuery[]>(`/api/queries/${id}`, body);
  return response;
};
