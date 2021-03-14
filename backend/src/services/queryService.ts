import { getCustomRepository } from 'typeorm';
import { ITransportedQuery } from '../common/models/query/ITransportedQuery';
import { QueryRepository } from '../data/repositories/queryRepository';
import { ICreateQuery } from '../common/models/query/ICreateQuery';
import { IUpdateQuery } from '../common/models/query/IUpdateQuery';

export const getQueries = async (id: string): Promise<ITransportedQuery[]> => {
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(id);
  if (!queries) {
    return [];
  }
  return queries;
};

export const addQuery = async (query: ICreateQuery): Promise<ITransportedQuery> => {
  const { name, code, appId, resourceId, showConfirm, runAutomatically } = query;
  const queries = await getCustomRepository(QueryRepository).addQuery(
    {
      name,
      code,
      resourceId,
      appId,
      showConfirm,
      runAutomatically
    }
  );
  return queries;
};

export const updateQueries = async (id: string, data: IUpdateQuery, appId: string): Promise<ITransportedQuery[]> => {
  if (data.name) {
    await getCustomRepository(QueryRepository).updateQuery(id, { name: data.name });
  } else await getCustomRepository(QueryRepository).updateQuery(id, { code: data.code });
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(appId);
  return queries;
};

export const deleteQuery = async (id: string, appId:string): Promise<ITransportedQuery[]> => {
  await getCustomRepository(QueryRepository).deleteQuery(id);
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(appId);
  return queries;
};
