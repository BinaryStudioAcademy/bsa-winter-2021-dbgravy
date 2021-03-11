import { Routine } from 'redux-saga-routines';
import { fetchResourceRoutine } from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
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

    default:
      return state;
  }
};
