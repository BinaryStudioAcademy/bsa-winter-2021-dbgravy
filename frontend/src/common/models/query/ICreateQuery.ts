import { ITrigger } from './ITrigger';

export interface ICreateQuery {
    name: string;
    code:string;
    appId:string;
    resourceId?:string;
    showConfirm: boolean;
    triggers:Array<ITrigger>|[]
}
