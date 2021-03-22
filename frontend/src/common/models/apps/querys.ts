import { ITrigger } from '../query/ITrigger';

export interface IQuery {
    id: string,
    name: string,
    code?:string,
    appId:string,
    resourceId:string,
    runAutomatically?:boolean,
    showConfirm?:boolean;
    triggers:Array<ITrigger>|[],
    data?: any
}
