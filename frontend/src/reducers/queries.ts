import { IQuery } from '../common/models/apps/querys';
import { Routine } from 'redux-saga-routines';
import {
  duplicateSelectQueryRoutine,
  fetchQueryRoutine, openQueryRoutine, setNewCodeRoutine, setNewNameQueryRoutine,
  setSelectQueryRoutine, setWaiterQueryRoutine
} from '../scenes/constructor/routines';

export interface IQueryState {
  queriesApp: Array<IQuery>;
  selectQuery:{
    selectQueryId: string,
    selectQueryName: string,
    selectQueryCode: string,
  },
  setNewCode:string,
  setNewName:string,
  queriesAppLength:number,
  isLoading: boolean,
  isOpen:boolean,
  waitingQuery:{
    QueryId?:string,
    QueryName?:string,
    QueryCode?:string
  }
}

const initialState:IQueryState = {
  queriesApp: [],
  selectQuery: {
    selectQueryId: '',
    selectQueryName: '',
    selectQueryCode: ''
  },
  setNewCode: '',
  setNewName: '',
  queriesAppLength: 0,
  isOpen: false,
  waitingQuery: {
    QueryId: '',
    QueryName: '',
    QueryCode: ''
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
      return {
        ...state,
        selectQuery: {
          selectQueryId: action.payload[0].id,
          selectQueryName: action.payload[0].name,
          selectQueryCode: action.payload[0].code
        },
        setNewCode: action.payload[0].code,
        setNewName: action.payload[0].name
      };
    case setSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        selectQuery: {
          selectQueryId: action.payload.id,
          selectQueryName: action.payload.name,
          selectQueryCode: action.payload.code
        },
        isOpen: action.payload.isOpen,
        setNewCode: action.payload.code,
        setNewName: action.payload.name
      };
    case duplicateSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: [...state.queriesApp, action.payload],
        queriesAppLength: state.queriesApp.length
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
    case setWaiterQueryRoutine.TRIGGER:
      return {
        ...state,
        waitingQuery: {
          QueryId: action.payload.id,
          QueryName: action.payload.name,
          QueryCode: action.payload.code
        },
        isOpen: action.payload.isOpen
      };
    default:
      return state;
  }
};
