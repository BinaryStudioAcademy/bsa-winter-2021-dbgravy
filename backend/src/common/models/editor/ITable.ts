export interface ITable {
  componentId:string
  queryId:string|null
}
export interface ITransportedTable extends ITable {
  id: string;
}
