import { Routine } from 'redux-saga-routines';
// <<<<<<< HEAD
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  clearResourceRoitine,
  testResourceRoitine
  // deleteResourceRoutine,
  // editResourseRoutine
} from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';
import { ResourceTypeValue } from '../common/enums/ResourceTypeValue';
import { ICreateResource } from '../common/models/resources/ICreateResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
  // <<<<<<< HEAD
  resource: ICreateResource;
  isConnected: boolean | null;
  // =======
  //   editResource?: {
  //     resource?: IResource,
  //     updated?: {}
  //     isFailed: boolean
  //   }
  // >>>>>>> dev
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
    // <<<<<<< HEAD
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
        // =======
        //     case deleteResourceRoutine.TRIGGER:
        //       return {
        //         ...state,
        //         isLoading: true,
        //         editResource: {
        //           ...action.payload,
        //           isFailed: false
        //         }
        //       };
        //     case deleteResourceRoutine.SUCCESS:
        //       return {
        //         ...state,
        //         isLoading: false,
        //         editResource: {
        //           isFailed: false
        //         }
        //       };
        //     case deleteResourceRoutine.FAILURE:
        //       return {
        //         ...state,
        //         isLoading: false,
        //         editResource: {
        //           ...action.payload,
        //           isFailed: true
        //         }
        //       };
        //     case editResourseRoutine.TRIGGER:
        //       return {
        //         ...state,
        //         editResource: {
        //           ...action.payload,
        //           isFailed: false
        //         }
        //       };
        //     case editResourseRoutine.SUCCESS:
        //       return {
        //         ...state,
        //         isLoading: false,
        //         editResource: {
        //           isFailed: false
        //         }
        //       };
        //     case editResourseRoutine.FAILURE:
        //       return {
        //         ...state,
        //         isLoading: false,
        //         editResource: {
        //           ...action.payload,
        //           isFailed: true
        //         }
        // >>>>>>> dev
      };
    default:
      return state;
  }
};
