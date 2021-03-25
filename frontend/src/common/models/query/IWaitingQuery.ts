import { ITrigger } from './ITrigger';

export interface IWaitingQuery {
    queryId?:string,
    queryName?:string,
    queryCode?:string,
    queryTriggers:Array<ITrigger>,
    showConfirm: boolean,
    resourceId: string
}
