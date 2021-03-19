import { Routine } from 'redux-saga-routines';
import { previewQueryRoutine } from '../components/Preview/routine';
import {
  duplicateSelectQueryRoutine,
  fetchQueryRoutine,
  openQueryRoutine,
  setNewCodeRoutine,
  setNewConfirmRoutine,
  setNewNameQueryRoutine,
  setNewRunRoutine,
  setSelectQueryRoutine, setSuccessTriggersRoutine,
  setUnSuccessTriggersRoutine,
  setWaiterQueryRoutine,
  runSelectQueryRoutine
} from '../scenes/constructor/routines';
import { ITrigger } from '../common/models/query/ITrigger';
import { IQueryState } from '../common/models/query/IQueryState';

const initialState: IQueryState = {
  queriesApp: [],
  selectQuery: {
    selectQueryId: '',
    selectQueryName: '',
    selectQueryCode: '',
    selectQueryTriggers: [],
    runAutomatically: false,
    showConfirm: false
  },
  setNewCode: '',
  runAutomaticallyTitle: 'Run query automatically when inputs change',
  setNewName: '',
  setNewRun: false,
  setNewConfirm: false,
  setNewSuccessTriggers: [],
  setNewUnSuccessTriggers: [],
  queriesAppLength: 0,
  isOpen: false,
  isDuplicate: false,
  waitingQuery: {
    queryId: '',
    queryName: '',
    queryCode: '',
    queryTriggers: [],
    runAutomatically: false,
    showConfirm: false
  },
  isLoading: true,
  resultData: []
};

export const queries = (state = initialState, action: Routine<any>): IQueryState => {
  let successTriggers: Array<ITrigger> = [];
  let UnSuccessTriggers: Array<ITrigger> = [];
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
      action.payload[0].triggers.forEach((element: ITrigger) => {
        if (element.success) {
          successTriggers = [...successTriggers, element];
        }
      });
      action.payload[0].triggers.forEach((element: ITrigger) => {
        if (!element.success) {
          UnSuccessTriggers = [...UnSuccessTriggers, element];
        }
      });
      return {
        ...state,
        selectQuery: {
          selectQueryId: action.payload[0].id,
          selectQueryName: action.payload[0].name,
          selectQueryCode: action.payload[0].code,
          selectQueryTriggers: action.payload[0].triggers,
          showConfirm: action.payload[0].showConfirm,
          runAutomatically: action.payload[0].runAutomatically
        },
        setNewCode: action.payload[0].code,
        setNewName: action.payload[0].name,
        setNewRun: action.payload[0].runAutomatically,
        setNewSuccessTriggers: successTriggers,
        setNewUnSuccessTriggers: UnSuccessTriggers,
        setNewConfirm: action.payload[0].showConfirm,
        runAutomaticallyTitle: runTitle
      };
    case setSelectQueryRoutine.SUCCESS:
      action.payload.triggers.forEach((element: ITrigger) => {
        if (element.success) {
          successTriggers = [...successTriggers, element];
        }
      });
      action.payload.triggers.forEach((element: ITrigger) => {
        if (!element.success) {
          UnSuccessTriggers = [...UnSuccessTriggers, element];
        }
      });
      const { id, name, code, triggers, showConfirm, runAutomatically } = action.payload;
      return {
        ...state,
        selectQuery: {
          selectQueryId: id,
          selectQueryName: name,
          selectQueryCode: code,
          selectQueryTriggers: triggers,
          showConfirm,
          runAutomatically
        },
        runAutomaticallyTitle: action.payload.runTitle,
        isOpen: action.payload.isOpen,
        setNewCode: code,
        setNewName: name,
        setNewConfirm: showConfirm,
        setNewRun: runAutomatically,
        setNewSuccessTriggers: successTriggers,
        setNewUnSuccessTriggers: UnSuccessTriggers
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
    case setSuccessTriggersRoutine.TRIGGER:
      return {
        ...state,
        setNewSuccessTriggers: [...state.setNewSuccessTriggers, action.payload]
      };
    case setSuccessTriggersRoutine.FAILURE:
      return {
        ...state,
        setNewSuccessTriggers: action.payload
      };
    case setUnSuccessTriggersRoutine.TRIGGER:
      return {
        ...state,
        setNewUnSuccessTriggers: [...state.setNewUnSuccessTriggers, action.payload]
      };
    case setUnSuccessTriggersRoutine.FAILURE:
      return {
        ...state,
        setNewUnSuccessTriggers: action.payload
      };
    case setWaiterQueryRoutine.TRIGGER:
      return {
        ...state,
        waitingQuery: {
          queryId: action.payload.id,
          queryName: action.payload.name,
          queryCode: action.payload.code,
          queryTriggers: action.payload.triggers,
          showConfirm: action.payload.showConfirm,
          runAutomatically: action.payload.runAutomatically
        },
        isOpen: action.payload.isOpen,
        isDuplicate: action.payload.isDuplicate
      };
    case runSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        resultData: action.payload,
        isLoading: false
      };
    case previewQueryRoutine.SUCCESS:
      return {
        ...state,
        resultData: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
