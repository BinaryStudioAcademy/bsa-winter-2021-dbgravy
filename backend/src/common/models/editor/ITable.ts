type Row = {
  [key: string]: string
}

export interface ITable {
  data: Row[]
}
export interface ITransportedTable extends ITable {
  id: string;
}
