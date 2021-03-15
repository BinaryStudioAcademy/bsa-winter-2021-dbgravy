import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  clearResourceRoitine,
  testResourceRoitine
} from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';
import { ResourceTypeValue } from '../common/enums/ResourceTypeValue';
import { ICreateResource } from '../common/models/resources/ICreateResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
  resource: ICreateResource;
  isConnected: boolean | null;
}

const initialState = {
  isLoading: true,
  resources: [],
  resource: {
    type: ResourceTypeValue.PostgreSQL,
    name: '',
    host: '',
    port: 0,
    dbName: '',
    dbUserName: '',
    dbPassword: '',
    id: '',
    organizationId: ''
  },
  isConnected: null
};

export const resource = (state: IResourcesState = initialState, action: Routine<any>): IResourcesState => {
  switch (action.type) {
    case fetchResourceRoutine.SUCCESS:
      return {
        ...state,
        resources: [...action.payload],
        isLoading: false
      };
    case getResourceByIdRoutine.SUCCESS:
      return {
        ...state,
        resource: action.payload
      };
    case clearResourceRoitine.TRIGGER:
      return {
        ...state,
        resource: initialState.resource
      };
    case testResourceRoitine.TRIGGER:
      return {
        ...state,
        isConnected: null
      };
    case testResourceRoitine.FAILURE:
      return {
        ...state,
        isConnected: false
      };
    case testResourceRoitine.SUCCESS:
      return {
        ...state,
        isConnected: true
      };
    default:
      return state;
  }
};
