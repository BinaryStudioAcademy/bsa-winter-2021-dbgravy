import { getConnectionManager } from 'typeorm';
import IResource from '../common/models/resource/IResource';

const connectionManager = getConnectionManager();

type TTestConnection = (values: IResource) => Promise<boolean>;

const testConnection: TTestConnection = async ({
  type,
  host,
  port,
  password = 'test',
  dbName: database = 'test',
  dbUsername: username = 'test'
}) => {
  const connection = connectionManager.create({
    type,
    host,
    port,
    username,
    password,
    database
  });
  await connection.connect(); // performs connection
  await connection.close();
  return true;
};

export default testConnection;
