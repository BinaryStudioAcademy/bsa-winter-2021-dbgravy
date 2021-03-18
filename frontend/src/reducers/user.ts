import { Routine } from 'redux-saga-routines';

import {
  fetchUserRoutine,
  loginUserRoutine,
  addNewUserRoutine,
  logotUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../scenes/Auth/routines';
import { createOrganizationRoutine, fetchOrgInfoRoutine } from '../containers/ProfilePopup/routines';
import { IUser } from '../common/models/user/IUser';
import { switchUserToOrganizationRoutine } from '../scenes/Settings/routines';
import { IUserOrganization } from '../common/models/user/IUserOrganization';

export interface IUserState {
  user: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
  currentOrganization?: IUserOrganization
}

const initialState = {
  isLoading: false,
  isAuthorized: false,
  user: {},
  currentOrganization: {}
};

export const user = (
  state = initialState,
  { type, payload }: Routine<any>
): IUserState => {
  switch (type) {
    case addNewUserRoutine.TRIGGER:
    case fetchUserRoutine.TRIGGER:
    case loginUserRoutine.TRIGGER:
    case forgotPasswordRoutine.TRIGGER:
    case resetPasswordRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };

    case forgotPasswordRoutine.SUCCESS:
    case forgotPasswordRoutine.FAILURE:
    case resetPasswordRoutine.SUCCESS:
    case resetPasswordRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
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
    case fetchUserRoutine.FAILURE:
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
    case logotUserRoutine.SUCCESS:
      return {
        isLoading: false,
        isAuthorized: false,
        user: {}
      };

    case switchUserToOrganizationRoutine.SUCCESS:
      return {
        ...state,
        user: payload
      };

    default:
      return state;
  }
};

export default user;
