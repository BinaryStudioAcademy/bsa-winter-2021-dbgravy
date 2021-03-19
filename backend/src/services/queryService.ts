import { getCustomRepository } from 'typeorm';
import { ITransportedQuery } from '../common/models/query/ITransportedQuery';
import { QueryRepository } from '../data/repositories/queryRepository';
import { ICreateQuery } from '../common/models/query/ICreateQuery';
import { IUpdateQuery } from '../common/models/query/IUpdateQuery';
import { TriggerRepository } from '../data/repositories/triggerRepository';

export const getQueries = async (id: string): Promise<ITransportedQuery[]> => {
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(id);
  if (!queries) {
    return [];
  }
  return queries;
};

export const addQuery = async (query: ICreateQuery): Promise<ITransportedQuery> => {
  const { name, code, appId, resourceId, showConfirm, runAutomatically, triggers } = query;
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

  await getCustomRepository(TriggerRepository).addQuery(triggers, queries.id);
  const queryWithTriggers = await getCustomRepository(QueryRepository).getQueryById(queries.id);
  return queryWithTriggers;
};

export const updateQueries = async (id: string, data: IUpdateQuery, appId: string): Promise<ITransportedQuery[]> => {
  const { name, code, showConfirm, runAutomatically, triggers, resourceId } = data;
  if (name) {
    await getCustomRepository(QueryRepository).updateQuery(id, { name });
  } else {
    await getCustomRepository(QueryRepository).updateQuery(id, {
      code, runAutomatically, showConfirm, resourceId });
    await getCustomRepository(TriggerRepository).updateTriggerArray(triggers, id);
  }
  const queries = await getQueries(appId);
  return queries;
};

export const deleteQuery = async (id: string, appId:string): Promise<ITransportedQuery[]> => {
  await getCustomRepository(TriggerRepository).deleteTriggers(id);
  await getCustomRepository(QueryRepository).deleteQuery(id);
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(appId);
  return queries;
};
