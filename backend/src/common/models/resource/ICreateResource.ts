import { ResourceType } from '../../enums/ResourceType';

export interface ICreateResource {
    name: string,
    type: ResourceType,
    host: string,
    port: number,
    dbName: string,
    dbUserName: string,
    dbPassword: string,
    organizationId: string
}
