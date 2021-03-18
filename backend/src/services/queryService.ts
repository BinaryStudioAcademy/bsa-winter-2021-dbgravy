import { createConnection } from 'typeorm';
import { ICreateQuery } from '../common/models/queries/ICreateQuery';
import { getResourceById } from './resourceService';
import { CustomError } from '../common/models/error/CustomError';

export const runQuery = async (queryData: ICreateQuery): Promise<any> => {
  const { name, type, host, port, dbUserName, dbPassword, dbName } = await getResourceById(queryData.resourceId);
  try {
    const connection = await createConnection({
      name,
      type,
      host,
      port,
      username: dbUserName,
      password: dbPassword,
      database: dbName,
      synchronize: true,
      logging: false
    });
    const rowData = await connection.manager.query(queryData.code);
    console.log(rowData);
    connection.close();
    return rowData;
  } catch {
    throw new CustomError('Connection failed', 400);
  }
};

