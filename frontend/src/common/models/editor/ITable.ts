type Row = {
  [key: string]: string
}

export interface ITable {
  id:string
  componentId:string
  queryId:string
  data: Row[]
}
