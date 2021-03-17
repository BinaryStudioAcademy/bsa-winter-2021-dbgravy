import { ITrigger } from './Trigger';

export interface IUpdateQuery {
    name?: string;
    code?:string;
    runAutomatically?:boolean;
    showConfirm?:boolean;
    triggers:Array<ITrigger>|[];
}
