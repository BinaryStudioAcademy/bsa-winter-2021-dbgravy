import { Routine } from 'redux-saga-routines';
import { fetchResourceRoutine, deleteResourceRoutine, editResourseRoutine } from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
  editResource?: {
    resource?: IResource,
    updated?: {}
    isFailed: boolean
  }
}

const initialState = {
  isLoading: true,
  resources: []
};

export const resource = (state: IResourcesState = initialState, action: Routine<any>): IResourcesState => {
  switch (action.type) {
    case fetchResourceRoutine.SUCCESS:
      return {
        ...state,
        resources: [...action.payload],
        isLoading: false
      };
    case deleteResourceRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        editResource: {
          ...action.payload,
          isFailed: false
        }
      };
    case deleteResourceRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        editResource: {
          isFailed: false
        }
      };
    case deleteResourceRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        editResource: {
          ...action.payload,
          isFailed: true
        }
      };
    case editResourseRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        editResource: {
          ...action.payload,
          isFailed: false
        }
      };
    case editResourseRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        editResource: {
          isFailed: false
        }
      };
    case editResourseRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        editResource: {
          ...action.payload,
          isFailed: true
        }
      };
    default:
      return state;
  }
};
