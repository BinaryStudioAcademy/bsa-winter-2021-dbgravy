import { Routine } from 'redux-saga-routines';
import {
  createOrganizationRoutine,
  fetchOrgInfoRoutine,
  fetchUserOrganizationsRoutine,
  changeUserOrganizationRoutine
} from '../containers/ProfilePopup/routines';
import { addNewUserRoutine, fetchUserRoutine, loginUserRoutine, logotUserRoutine } from '../scenes/Auth/routines';
import { IUser } from '../common/models/user/IUser';
import { switchUserToOrganizationRoutine } from '../scenes/Settings/routines';
import { IUserOrganization } from '../common/models/user/IUserOrganization';

export interface IUserState {
  user: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
  currentOrganization?: IUserOrganization,
  organizations: IUserOrganization[]
}

const initialState = {
  isLoading: false,
  isAuthorized: false,
  user: {},
  currentOrganization: {
    id: ''
  },
  organizations: []
};

export const user = (
  state = initialState,
  { type, payload }: Routine<any>
): IUserState => {
  switch (type) {
    case addNewUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case addNewUserRoutine.SUCCESS:
    case fetchUserRoutine.SUCCESS:
    case loginUserRoutine.SUCCESS: {
      const {
        id,
        firstName,
        lastName,
        organizationId,
        email
      } = payload;
      return {
        ...state,
        user: {
          id,
          firstName,
          lastName,
          organizationId,
          email
        },
        isLoading: false,
        isAuthorized: Boolean(payload?.id)
      };
    }
    case addNewUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case fetchUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case loginUserRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case loginUserRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthorized: false
      };
    case fetchOrgInfoRoutine.TRIGGER:
      return {
        ...state,
        currentOrganization: {
          ...state.currentOrganization,
          isLoading: true,
          isFailed: false
        }
      };
    case fetchOrgInfoRoutine.SUCCESS:
      return {
        ...state,
        currentOrganization: {
          ...payload.currentOrganization,
          isLoading: false,
          isFailed: false
        }
      };
    case fetchOrgInfoRoutine.FAILURE:
      return {
        ...state,
        currentOrganization: {
          ...state.currentOrganization
        }
      };
    case createOrganizationRoutine.TRIGGER:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {
            isLoading: false,
            isFailed: false,
            isSuccess: false
          }
        }
      };
    case createOrganizationRoutine.REQUEST:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {
            ...payload.newOrganization,
            isLoading: true,
            isFailed: false
          }
        }
      };
    case createOrganizationRoutine.SUCCESS:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {
            isFailed: false,
            isSuccess: true
          }
        }
      };
    case createOrganizationRoutine.FAILURE:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {
            isFailed: true,
            isSuccess: false
          }
        }
      };
    case createOrganizationRoutine.FULFILL:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {}
        }
      };
    case switchUserToOrganizationRoutine.SUCCESS:
      return {
        ...state,
        user: payload
      };
    case fetchUserOrganizationsRoutine.SUCCESS:
      return {
        ...state,
        organizations: payload
      };
    case changeUserOrganizationRoutine.SUCCESS:
      return {
        ...state,
        currentOrganization: payload
      };
    case logotUserRoutine.SUCCESS:
      return {
        isLoading: false,
        isAuthorized: false,
        user: {},
        currentOrganization: {
          id: ''
        },
        organizations: []
      };
    default:
      return state;
  }
};

export default user;
