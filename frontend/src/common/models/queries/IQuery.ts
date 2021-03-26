export interface IQuery {
  id: string,
  createdAt?: Date,
  updatedAt?: Date,
  name: string,
  code: string,
  showConfirm: boolean,
  appId: string,
  resourceId: string
}
