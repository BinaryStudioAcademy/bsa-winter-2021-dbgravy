import { IQuery } from '../common/models/apps/querys';
import { Routine } from 'redux-saga-routines';
import {
  duplicateSelectQueryRoutine,
  fetchQueryRoutine,
  openQueryRoutine,
  setNewCodeRoutine,
  setNewConfirmRoutine,
  setNewNameQueryRoutine,
  setNewRunRoutine,
  setSelectQueryRoutine,
  setWaiterQueryRoutine
} from '../scenes/constructor/routines';

export interface IQueryState {
  queriesApp: Array<IQuery>;
  selectQuery:{
    selectQueryId: string,
    selectQueryName: string,
    selectQueryCode: string,
    runAutomatically: boolean,
    showConfirm: boolean
  },
  setNewCode:string,
  setNewRun: boolean,
  runAutomaticallyTitle:string,
  setNewName:string,
  setNewConfirm:boolean,
  queriesAppLength:number,
  isLoading: boolean,
  isOpen:boolean,
  isDuplicate:boolean,
  waitingQuery:{
    QueryId?:string,
    QueryName?:string,
    QueryCode?:string,
    runAutomatically: boolean,
    showConfirm: boolean
  }
}

const initialState:IQueryState = {
  queriesApp: [],
  selectQuery: {
    selectQueryId: '',
    selectQueryName: '',
    selectQueryCode: '',
    runAutomatically: false,
    showConfirm: false
  },
  setNewCode: '',
  runAutomaticallyTitle: 'Run query automatically when inputs change',
  setNewName: '',
  setNewRun: false,
  setNewConfirm: false,
  queriesAppLength: 0,
  isOpen: false,
  isDuplicate: false,
  waitingQuery: {
    QueryId: '',
    QueryName: '',
    QueryCode: '',
    runAutomatically: false,
    showConfirm: false
  },
  isLoading: true
};

export const queries = (state = initialState, action: Routine<any>): IQueryState => {
  switch (action.type) {
    case fetchQueryRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: [...action.payload],
        queriesAppLength: action.payload.length,
        isLoading: false
      };
    case openQueryRoutine.SUCCESS:
      const runTitle = action.payload[0].runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      return {
        ...state,
        selectQuery: {
          selectQueryId: action.payload[0].id,
          selectQueryName: action.payload[0].name,
          selectQueryCode: action.payload[0].code,
          showConfirm: action.payload[0].showConfirm,
          runAutomatically: action.payload[0].runAutomatically
        },
        setNewCode: action.payload[0].code,
        setNewName: action.payload[0].name,
        setNewRun: action.payload[0].runAutomatically,
        setNewConfirm: action.payload[0].showConfirm,
        runAutomaticallyTitle: runTitle
      };
    case setSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        selectQuery: {
          selectQueryId: action.payload.id,
          selectQueryName: action.payload.name,
          selectQueryCode: action.payload.code,
          showConfirm: action.payload.showConfirm,
          runAutomatically: action.payload.runAutomatically
        },
        runAutomaticallyTitle: action.payload.runTitle,
        isOpen: action.payload.isOpen,
        setNewCode: action.payload.code,
        setNewName: action.payload.name,
        setNewConfirm: action.payload.showConfirm,
        setNewRun: action.payload.runAutomatically
      };
    case duplicateSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: [...state.queriesApp, action.payload],
        queriesAppLength: state.queriesApp.length + 1,
        isOpen: false
      };
    case setNewCodeRoutine.TRIGGER:
      return {
        ...state,
        setNewCode: action.payload.code
      };
    case setNewNameQueryRoutine.TRIGGER:
      return {
        ...state,
        setNewName: action.payload.name
      };
    case setNewRunRoutine.TRIGGER:
      return {
        ...state,
        setNewRun: action.payload.status,
        runAutomaticallyTitle: action.payload.title
      };
    case setNewConfirmRoutine.TRIGGER:
      return {
        ...state,
        setNewConfirm: action.payload
      };
    case setWaiterQueryRoutine.TRIGGER:
      return {
        ...state,
        waitingQuery: {
          QueryId: action.payload.id,
          QueryName: action.payload.name,
          QueryCode: action.payload.code,
          showConfirm: action.payload.showConfirm,
          runAutomatically: action.payload.runAutomatically
        },
        isOpen: action.payload.isOpen,
        isDuplicate: action.payload.isDuplicate
      };
    default:
      return state;
  }
};
