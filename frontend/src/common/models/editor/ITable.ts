type Row = {
  [key: string]: string
}

export interface ITable {
  data: Row[],
  queryId?: string
}
