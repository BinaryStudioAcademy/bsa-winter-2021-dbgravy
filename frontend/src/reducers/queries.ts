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
  setSuccessTriggersRoutine,
  setNewResourcesRoutine,
  setResourcesRoutine,
  setUnSuccessTriggersRoutine,
  setWaiterQueryRoutine, takeResourcesTableAndColumns,
  runSelectQueryRoutine,
  previewSelectQueryRoutine,
  runTriggerRoutine
} from '../scenes/constructor/routines';
import { ITrigger } from '../common/models/query/ITrigger';
import { IQueryState } from '../common/models/query/IQueryState';
import { ResourceTypeValue } from '../common/enums/ResourceTypeValue';

const initialState: IQueryState = {
  queriesApp: [],
  selectQuery: {
    selectQueryId: '',
    selectQueryName: '',
    selectQueryCode: '',
    selectQueryTriggers: [],
    runAutomatically: false,
    showConfirm: false,
    resourceId: '',
    data: [],
    queryMessage: ''
  },
  setNewCode: '',
  runAutomaticallyTitle: 'Run query automatically when inputs change',
  setNewName: '',
  setNewRun: false,
  setNewConfirm: false,
  setNewSuccessTriggers: [],
  setNewUnSuccessTriggers: [],
  setSelectResourceTable: { tables: {} },
  setNewResource: {
    id: '1',
    createdAt: undefined,
    updatedAt: undefined,
    name: 'name',
    type: ResourceTypeValue.PostgreSQL,
    host: '888',
    port: 12,
    dbName: 'name',
    dbUserName: 'name',
    dbPassword: 'name',
    organizationId: 'name'
  },
  resources: [],
  queriesAppLength: 0,
  isOpen: false,
  isDuplicate: false,
  waitingQuery: {
    queryId: '',
    queryName: '',
    queryCode: '',
    queryTriggers: [],
    resourceId: '',
    runAutomatically: false,
    showConfirm: false
  },
  isLoading: true,
  isResultLoading: true
};

export const queries = (state = initialState, action: Routine<any>): IQueryState => {
  let successTriggers: Array<ITrigger> = [];
  let UnSuccessTriggers: Array<ITrigger> = [];
  switch (action.type) {
    case fetchQueryRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: [...action.payload],
        queriesAppLength: action.payload.length
      };
    case openQueryRoutine.SUCCESS:
      const runTitle = action.payload[0].runAutomatically ? 'Run query only when manually triggered'
        : 'Run query automatically when inputs change';
      const baseResource = state.resources.find(element => element.id === action.payload[0].resourceId);
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
          runAutomatically: action.payload[0].runAutomatically,
          resourceId: action.payload[0].resourceId,
          data: [],
          queryMessage: ''
        },
        setNewCode: action.payload[0].code,
        setNewName: action.payload[0].name,
        setNewRun: action.payload[0].runAutomatically,
        setNewResource: baseResource,
        setNewSuccessTriggers: successTriggers,
        setNewUnSuccessTriggers: UnSuccessTriggers,
        setNewConfirm: action.payload[0].showConfirm,
        runAutomaticallyTitle: runTitle,
        isLoading: false
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
      const { id, name, code, triggers, showConfirm, runAutomatically, resourceId } = action.payload;
      console.log(showConfirm);
      const baseSelectResource = state.resources.find(element => element.id === resourceId);
      return {
        ...state,
        selectQuery: {
          selectQueryId: id,
          selectQueryName: name,
          selectQueryCode: code,
          selectQueryTriggers: triggers,
          resourceId,
          showConfirm,
          runAutomatically,
          queryMessage: '',
          data: []
        },
        runAutomaticallyTitle: action.payload.runTitle,
        isOpen: action.payload.isOpen,
        setNewCode: code,
        setNewName: name,
        setNewConfirm: showConfirm,
        setNewRun: runAutomatically,
        setNewResource: baseSelectResource,
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
    case setNewResourcesRoutine.TRIGGER:
      const newBaseResource = state.resources.find(element => element.id === action.payload);
      return {
        ...state,
        setNewResource: newBaseResource
      };
    case setResourcesRoutine.TRIGGER:
      return {
        ...state,
        resources: action.payload
      };
    case takeResourcesTableAndColumns.SUCCESS:
      return {
        ...state,
        setSelectResourceTable: action.payload
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
          runAutomatically: action.payload.runAutomatically,
          resourceId: action.payload.resourceId
        },
        isOpen: action.payload.isOpen,
        isDuplicate: action.payload.isDuplicate
      };
    case runSelectQueryRoutine.TRIGGER:
      return {
        ...state,
        isResultLoading: true,
        selectQuery: {
          ...state.selectQuery,
          queryMessage: ''
        }
      };
    case runSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: state.queriesApp.map(query => {
          if (query.name === action.payload.name) {
            return {
              ...query,
              data: action.payload.resultData
            };
          }
          return query;
        }),
        selectQuery: {
          ...state.selectQuery,
          data: action.payload.resultData,
          queryMessage: `${action.payload.name} successfully run`
        },
        isResultLoading: false
      };
    case runTriggerRoutine.FAILURE:
      return {
        ...state,
        selectQuery: {
          ...state.selectQuery,
          queryMessage: `${action.payload} run failed`
        }
      };
    case runTriggerRoutine.SUCCESS:
      return {
        ...state,
        queriesApp: state.queriesApp.map(query => {
          if (query.name === action.payload.name) {
            return {
              ...query,
              data: action.payload.resultData
            };
          }
          return query;
        })
      };
    case previewSelectQueryRoutine.TRIGGER:
      return {
        ...state,
        isLoading: false,
        isResultLoading: true,
        selectQuery: {
          ...state.selectQuery,
          data: []
        }
      };
    case previewSelectQueryRoutine.SUCCESS:
      return {
        ...state,
        selectQuery: {
          ...state.selectQuery,
          data: action.payload
        },
        isLoading: false,
        isResultLoading: false
      };
    default:
      return state;
  }
};
