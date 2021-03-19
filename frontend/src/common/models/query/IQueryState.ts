import { IQuery } from '../apps/querys';
import { ITrigger } from './ITrigger';
import { IWaitingQuery } from './IWaitingQuery';

export interface IQueryState {
    queriesApp: Array<IQuery>;
    selectQuery:{
        selectQueryId: string,
        selectQueryName: string,
        selectQueryCode: string,
        selectQueryTriggers:Array<ITrigger>,
        runAutomatically: boolean,
        showConfirm: boolean
    },
    setNewCode:string,
    setNewRun: boolean,
    runAutomaticallyTitle:string,
    setNewName:string,
    setNewConfirm:boolean,
    setNewSuccessTriggers:Array<ITrigger>,
    setNewUnSuccessTriggers:Array<ITrigger>,
    queriesAppLength:number,
    isLoading: boolean,
    isOpen:boolean,
    isDuplicate:boolean,
    waitingQuery: IWaitingQuery,
    resultData: any,
    isResultLoading: boolean,
}
