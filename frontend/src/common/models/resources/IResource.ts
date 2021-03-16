import { ResourceTypeValue } from '../../enums/ResourceTypeValue';

export interface IResource {
  id: string,
  createdAt?: Date,
  updatedAt?: Date,
  name: string,
  type: ResourceTypeValue,
  host: string,
  port: number,
  dbName: string,
  dbUserName: string,
  dbPassword: string,
  organizationId: string
}
