import { Routine } from 'redux-saga-routines';
import {
  createResourceRoutine,
  updateResourceRoutine,
  deleteResourceByIdRoutine,
  //  getResourceByIdRoutine,
  fetchResourceRoutine
} from '../scenes/Resources/routines';

import TResource from '../common/models/types/TResource';
import resourceInitValues from '../common/models/formik/resource/resourceInitValues';

export interface IResourcesState {
  resources: Array<TResource>;
  editInitialState: TResource,
  isLoading: boolean
}

export const resource = (
  state: IResourcesState = {
    resources: [],
    editInitialState: resourceInitValues,
    isLoading: false
  },
  action: Routine<any>
): IResourcesState => {
  switch (action.type) {
    case fetchResourceRoutine.success:
    case createResourceRoutine.success:
    case updateResourceRoutine.success:
    case deleteResourceByIdRoutine.success:
      return {
        ...state,
        resources: [...action.payload],
        isLoading: false
      };

    default:
      return state;
  }
};
