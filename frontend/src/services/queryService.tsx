import api from '../common/helpers/apiHelper';
import { IQuery } from '../common/models/apps/querys';
import { ICreateQuery } from '../common/models/query/ICreateQuery';
import { IUpdateQuery } from '../common/models/query/IUpdateQuery';
import { IDeleteQuery } from '../common/models/query/IDeleteQuery';
import { IRunQuery } from '../common/models/query/IRunQuery';

export const addQuery = async ({ name, code, appId, resourceId, showConfirm,
  triggers }: ICreateQuery) => {
  const body = {
    name,
    code,
    appId,
    resourceId,
    showConfirm,
    triggers
  };
  const response = await api.post<IQuery>('/api/queries', body);
  return response;
};

export const fetchQueries = async (id: string) => {
  const response = await api.get<IQuery[]>(`/api/queries/${id}`);
  return response;
};

export const updateQuery = async ({ id, data, appId }: IUpdateQuery) => {
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

export const runQuery = async ({ data, appId, resourceId }: IRunQuery) => {
  const body = {
    code: data.code,
    appId,
    resourceId,
    triggers: data.triggers
  };
  return (api.post<IQuery>('/api/queries/run', body));
};

export const previewQuery = async ({ data, appId, resourceId }: IRunQuery) => {
  const body = {
    code: data.code,
    appId,
    resourceId,
    triggers: data.triggers
  };
  return (api.post<IQuery>('/api/queries/run', body));
};
