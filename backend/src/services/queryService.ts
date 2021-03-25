import { getCustomRepository, createConnection } from 'typeorm';
import { ITransportedQuery } from '../common/models/query/ITransportedQuery';
import { QueryRepository } from '../data/repositories/queryRepository';
import { ICreateQuery } from '../common/models/query/ICreateQuery';
import { IUpdateQuery } from '../common/models/query/IUpdateQuery';
import { TriggerRepository } from '../data/repositories/triggerRepository';
import { getResourceById } from './resourceService';
import { CustomError } from '../common/models/error/CustomError';

export const getQueries = async (id: string): Promise<ITransportedQuery[]> => {
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(id);
  if (!queries) {
    return [];
  }
  return queries;
};

export const addQuery = async (query: ICreateQuery): Promise<ITransportedQuery> => {
  const { name, code, appId, resourceId, showConfirm, triggers } = query;
  const queries = await getCustomRepository(QueryRepository).addQuery(
    {
      name,
      code,
      resourceId,
      appId,
      showConfirm
    }
  );

  await getCustomRepository(TriggerRepository).addQuery(triggers, queries.id);
  const queryWithTriggers = await getCustomRepository(QueryRepository).getQueryById(queries.id);
  return queryWithTriggers;
};

export const updateQueries = async (id: string, data: IUpdateQuery, appId: string): Promise<ITransportedQuery[]> => {
  const { name, code, showConfirm, triggers, resourceId } = data;
  if (name) {
    await getCustomRepository(QueryRepository).updateQuery(id, { name });
  } else {
    await getCustomRepository(QueryRepository).updateQuery(id, {
      code, showConfirm, resourceId
    });
    await getCustomRepository(TriggerRepository).updateTriggerArray(triggers, id);
  }
  const queries = await getQueries(appId);
  return queries;
};

export const deleteQuery = async (id: string, appId: string): Promise<ITransportedQuery[]> => {
  await getCustomRepository(TriggerRepository).deleteTriggers(id);
  await getCustomRepository(QueryRepository).deleteQuery(id);
  const queries = await getCustomRepository(QueryRepository).getAllQueryByAppId(appId);
  return queries;
};

export const runQuery = async (queryData: ICreateQuery): Promise<any> => {
  const { code, resourceId } = queryData;
  const { type, host, port, dbUserName, dbPassword, dbName } = await getResourceById(resourceId);
  try {
    const connection = await createConnection({
      name: code,
      type,
      host,
      port,
      username: dbUserName,
      password: dbPassword,
      database: dbName,
      synchronize: true,
      logging: false
    });
    const rowData = await connection.manager.query(code);
    connection.close();
    return rowData;
  } catch (err) {
    throw new CustomError('Connection failed', 400);
  }
};

