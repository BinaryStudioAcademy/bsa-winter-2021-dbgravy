import { Routine } from 'redux-saga-routines';
import { fetchAppRoutine, editAppRoutine, deleteAppRoutine, showEditRoutine } from '../scenes/Apps/routines';
import { IApps } from '../common/models/apps/IApps';

export interface IAppsState {
  isLoading: boolean,
  apps: Array<IApps>;
  editedApp?: {
    app?: IApps,
    name?: string,
    isFailed: boolean,
    isShow?: boolean
  },
  modal?: {
    show: boolean,
    isEdit?: boolean,
    app: IApps
  }
}

const initialState = {
  isLoading: true,
  apps: []
};

export const application = (state: IAppsState = initialState, { type, payload }: Routine<any>): IAppsState => {
  switch (type) {
    case fetchAppRoutine.SUCCESS:
      return {
        ...state,
        apps: [...payload],
        isLoading: false
      };
    case editAppRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        editedApp: {
          isFailed: false,
          app: payload.app,
          name: payload.name
        }
      };
    case deleteAppRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        editedApp: {
          isFailed: false,
          app: payload.app
        }
      };
    case showEditRoutine.TRIGGER:
      return {
        ...state,
        modal: {
          ...payload
        }
      };
    case editAppRoutine.SUCCESS:
      const idx = state.apps.findIndex(({ id }) => payload.id === id);
      const apps = [...state.apps];
      apps.splice(idx, 1, payload);
      return {
        ...state,
        apps,
        isLoading: false,
        editedApp: {
          isFailed: false
        }
      };
    case deleteAppRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        editedApp: {
          isFailed: false
        }
      };
    case editAppRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        editedApp: {
          isFailed: true,
          app: payload.app
        }
      };
    case deleteAppRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        editedApp: {
          isFailed: true,
          app: payload.app
        }
      };
    default:
      return state;
  }
};
