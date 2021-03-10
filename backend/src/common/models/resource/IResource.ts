import { resourceTypeValue } from '../../enums/ResourceTypeValue';

interface IResource {
  type: resourceTypeValue;
  name: string;
  host: string;
  port: number
  dbName?: string;
  dbUsername?: string;
  password?: string;
  id?: string;
}

export default IResource;
