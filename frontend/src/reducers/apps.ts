import { Routine } from 'redux-saga-routines';
import { fetchAppRoutine } from '../scenes/Applications/routines';

interface IAppsState {
  apps: Array<{id: string, name: string}>;
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
