import { IQuery } from '../apps/querys';
import { ITrigger } from './ITrigger';
import { IWaitingQuery } from './IWaitingQuery';
import { IResource } from '../resources/IResource';
import { ITables } from '../resources/ITables';

export interface IQueryState {
    queriesApp: Array<IQuery>;
    selectQuery:{
        selectQueryId: string,
        selectQueryName: string,
        selectQueryCode: string,
        selectQueryTriggers:Array<ITrigger>,
        runAutomatically: boolean,
        showConfirm: boolean,
        resourceId:string
    },
    setNewCode:string,
    setSelectResourceTable:ITables,
    resources: Array<IResource>,
    setNewRun: boolean,
    runAutomaticallyTitle:string,
    setNewName:string,
    setNewConfirm:boolean,
    setNewResource: IResource|undefined,
    setNewSuccessTriggers:Array<ITrigger>,
    setNewUnSuccessTriggers:Array<ITrigger>,
    queriesAppLength:number,
    isLoading: boolean,
    isOpen:boolean,
    isDuplicate:boolean,
    waitingQuery: IWaitingQuery
}
