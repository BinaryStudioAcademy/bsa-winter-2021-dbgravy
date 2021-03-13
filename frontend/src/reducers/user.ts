import { Routine } from 'redux-saga-routines';
import {
  fetchOrgInfoRoutine,
  createOrganizationRoutine
} from '../containers/ProfilePopup/routines';
import {
  fetchUserRoutine,
  loginUserRoutine,
  addNewUserRoutine,
  logotUserRoutine
} from '../scenes/Auth/routines';
import { IUser } from '../common/models/user/IUser';
import { Roles } from '../common/enums/UserRoles';

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
}

// dev only
const initialState = {
  isLoading: false,
  isAuthorized: false
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
        role,
        status,
        organizationId,
        email
      } = payload;
      return {
        ...state,
        user: {
          id,
          firstName,
          lastName,
          role,
          status,
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
        user: {
          ...payload,
          currentOrganization: {
            name: '',
            role: Roles.Viewer,
            isLoading: true,
            isFailed: false
          }
        }
      };
    case fetchOrgInfoRoutine.SUCCESS:
      return {
        ...state,
        user: {
          ...payload.user,
          currentOrganization: {
            ...payload.currentOrganization,
            isLoading: false,
            isFailed: false
          }
        }
      };
    case fetchOrgInfoRoutine.FAILURE:
      return {
        ...state,
        user: {
          ...payload.user,
          currentOrganization: {
            isFailed: true
          }
        }
      };
    case createOrganizationRoutine.TRIGGER:
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
            isFailed: false
          }
        }
      };
    case createOrganizationRoutine.FAILURE:
      return {
        ...state,
        user: {
          ...payload.user,
          newOrganization: {
            isFailed: true
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
    case logotUserRoutine.SUCCESS:
      return {
        isLoading: false,
        isAuthorized: false
      };
    default:
      return state;
  }
};

export default user;
