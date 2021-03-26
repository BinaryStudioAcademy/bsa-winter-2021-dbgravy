import { Routine } from 'redux-saga-routines';
import {
  duplicateSelectQueryRoutine,
  fetchQueryRoutine,
  openQueryRoutine,
  setNewCodeRoutine,
  setNewConfirmRoutine,
  setNewNameQueryRoutine,
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
    showConfirm: false,
    resourceId: '',
    data: []
  },
  setNewCode: '',
  setNewName: '',
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
          resourceId: action.payload[0].resourceId,
          data: []
        },
        setNewCode: action.payload[0].code,
        setNewName: action.payload[0].name,
        setNewResource: baseResource,
        setNewSuccessTriggers: successTriggers,
        setNewUnSuccessTriggers: UnSuccessTriggers,
        setNewConfirm: action.payload[0].showConfirm,
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
      const { id, name, code, triggers, showConfirm, resourceId } = action.payload;
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
          data: []
        },
        isOpen: action.payload.isOpen,
        setNewCode: code,
        setNewName: name,
        setNewConfirm: showConfirm,
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
          ...state.selectQuery
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
          data: action.payload.resultData
        },
        isResultLoading: false
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
