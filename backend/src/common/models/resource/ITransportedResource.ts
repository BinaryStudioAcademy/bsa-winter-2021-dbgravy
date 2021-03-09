export interface ITransportedResource {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  type: string,
  host: string,
  port: number,
  dbName: string,
  dbUserName: string,
  dbPassword: string,
  organizationId: string
}
