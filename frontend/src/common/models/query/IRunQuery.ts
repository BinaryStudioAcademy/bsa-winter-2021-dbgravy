import { ITrigger } from './ITrigger';

interface IData {
  code: string,
  triggers: Array<ITrigger>|[];
}

export interface IRunQuery {
    appId?:string;
    resourceId?:string;
    data: IData
}
