import { ITrigger } from '../query/ITrigger';

export interface IQuery {
    id: string,
    name: string,
    code?:string,
    appId:string,
    resourceId:string,
    showConfirm?:boolean;
    triggers:Array<ITrigger>|[],
    data?: any
}
