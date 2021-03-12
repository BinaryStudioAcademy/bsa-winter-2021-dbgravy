import { Routine } from 'redux-saga-routines';
import { fetchResourceRoutine } from '../scenes/Resources/routines';
import { IResource } from '../common/models/resources/IResource';
import { ResourceTypeValue } from '../common/enums/ResourceTypeValue';
import { ICreateResource } from '../common/models/resources/ICreateResource';

export interface IResourcesState {
  isLoading: boolean,
  resources: Array<IResource>;
  resource: ICreateResource
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
  }
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
