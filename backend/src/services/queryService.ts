import { createConnection } from 'typeorm';
import { ICreateQuery } from '../common/models/queries/ICreateQuery';
import { getResourceById } from './resourceService';
import { CustomError } from '../common/models/error/CustomError';

export const runQuery = async (queryData: ICreateQuery): Promise<any> => {
  const resource = await getResourceById(queryData.resourceId);
  try {
    const connection = await createConnection({
      name: resource.name,
      type: resource.type,
      host: resource.host,
      port: resource.port,
      username: resource.dbUserName,
      password: resource.dbPassword,
      database: resource.dbName,
      synchronize: true,
      logging: false
    });
    const rawData = await connection.manager.query(queryData.code);
    console.log(rawData);
    connection.close();
    return rawData;
  } catch {
    throw new CustomError('Connection failed', 400);
  }
};

