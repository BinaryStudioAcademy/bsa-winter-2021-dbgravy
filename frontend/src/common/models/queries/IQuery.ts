export interface IQuery {
  id: string,
  createdAt?: Date,
  updatedAt?: Date,
  name: string,
  runAutomatically: boolean,
  code: string,
  showConfirm: boolean,
  appId: string,
  resourceId: string
}
