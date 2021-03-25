import { ITrigger } from './Trigger';

export interface IUpdateQuery {
    name?: string;
    code?:string;
    resourceId:string
    showConfirm?:boolean;
    triggers:Array<ITrigger>;
}
