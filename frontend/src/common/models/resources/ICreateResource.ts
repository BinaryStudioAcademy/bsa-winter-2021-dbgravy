import { ResourceTypeValue } from '../../enums/ResourceTypeValue';

export interface ICreateResource {
  id?: string,
  name: string,
  type: ResourceTypeValue,
  host: string,
  port: number | '',
  dbName: string,
  dbUserName: string,
  dbPassword: string,
  organizationId: string
}
