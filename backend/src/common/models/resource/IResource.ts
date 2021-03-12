import { ResourceType } from '../../enums/ResourceType';

interface IResource {
  save(): import("../../../data/entities/Resource").Resource | PromiseLike<import("../../../data/entities/Resource").Resource>;
  type: ResourceType;
  name: string;
  host: string;
  port: number
  dbName?: string;
  dbUsername?: string;
  password?: string;
  id?: string;
}

export default IResource;
