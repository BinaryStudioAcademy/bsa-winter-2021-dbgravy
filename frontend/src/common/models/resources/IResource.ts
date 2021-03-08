export interface IResource {
  id: string,
  createdAt: string,
  updatedAt?: string,
  name: string,
  type: string,
  host?: string,
  port?: number,
  dbName: string,
  dbUserName?: string,
  dbPassword?: string
  organizationId?: string
}
