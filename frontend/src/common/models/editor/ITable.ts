type Row = {
  [key: string]: string
}

export interface ITable {
  queryId:string
  data: Row[]
}
