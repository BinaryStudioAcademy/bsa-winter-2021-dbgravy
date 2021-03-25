type Row = {
  [key: string]: string
}

export interface ITable {
  id:string
  queryId:string
  data: Row[]
}
