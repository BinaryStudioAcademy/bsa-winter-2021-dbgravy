import { Routine } from 'redux-saga-routines';
import { fetchAppRoutine } from '../scenes/Apps/routines';
import { IApps } from '../common/models/apps/IApps';

interface IAppsState {
  apps: Array<IApps>;
}

const initialState = {
  apps: []
};

export const application = (state: IAppsState = initialState, action: Routine<any>): IAppsState => {
  switch (action.type) {
    case fetchAppRoutine.SUCCESS:
      return {
        ...state,
        apps: [...action.payload]
      };

    default:
      return state;
  }
};
