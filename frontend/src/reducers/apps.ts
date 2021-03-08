import { Routine } from 'redux-saga-routines';
import { fetchAppRoutine } from '../scenes/Apps/routines';
import { IApps } from '../common/models/apps/IApps';

export interface IAppsState {
  isLoading: boolean,
  apps: Array<IApps>;
}

const initialState = {
  isLoading: true,
  apps: []
};

export const application = (state: IAppsState = initialState, action: Routine<any>): IAppsState => {
  switch (action.type) {
    case fetchAppRoutine.SUCCESS:
      return {
        ...state,
        apps: [...action.payload],
        isLoading: false
      };

    default:
      return state;
  }
};
