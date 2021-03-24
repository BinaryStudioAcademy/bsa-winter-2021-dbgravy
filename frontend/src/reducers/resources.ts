import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  clearResourceRoutine,
  testResourceRoutine,
  deleteResourceRoutine,
  updateResourceRoutine
} from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';
import { ResourceTypeValue } from '../common/enums/ResourceTypeValue';
import { ICreateResource } from '../common/models/resources/ICreateResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
  resource: ICreateResource;
  isConnected: boolean | null;
  isFailed: boolean,
  errorMessage?: string
}

const initialState: IResourcesState = {
  isLoading: true,
  resources: [],
  resource: {
    type: ResourceTypeValue.PostgreSQL,
    name: '',
    host: '',
    port: '',
    dbName: '',
    dbUserName: '',
    dbPassword: '',
    id: '',
    organizationId: ''
  },
  isConnected: null,
  isFailed: false,
  errorMessage: ''
};

export const resource = (state: IResourcesState = initialState, action: Routine<any>): IResourcesState => {
  switch (action.type) {
    case fetchResourceRoutine.SUCCESS:
      return {
        ...state,
        resources: [...action.payload],
        isLoading: false,
        isFailed: false,
        isConnected: null
      };
    case getResourceByIdRoutine.SUCCESS:
      return {
        ...state,
        resource: action.payload
      };
    case getResourceByIdRoutine.FAILURE:
      return {
        ...state,
        isFailed: true,
        errorMessage: action.payload

      };
    case clearResourceRoutine.TRIGGER:
      return {
        ...state,
        resource: initialState.resource
      };
    case testResourceRoutine.TRIGGER:
      return {
        ...state,
        isConnected: null
      };
    case testResourceRoutine.FAILURE:
      return {
        ...state,
        isConnected: false,
        errorMessage: action.payload,
        isFailed: true
      };
    case testResourceRoutine.SUCCESS:
      return {
        ...state,
        isConnected: true
      };
    case updateResourceRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errorMessage: action.payload
      };
    case deleteResourceRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        resource: action.payload,
        isFailed: false
      };
    case deleteResourceRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
