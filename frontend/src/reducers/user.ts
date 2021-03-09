import { Routine } from 'redux-saga-routines';
import { Roles } from '../common/enums/UserRoles';
import { IUserOrganization } from '../common/models/user/IUserOrganization';
import {
  fetchOrgInfoRoutine,
  createOrganizationRoutine
} from '../containers/ProfilePopup/routines';
import {
  fetchUserRoutine,
  loginUserRoutine,
  addNewUserRoutine
} from '../scenes/Auth/routines';
import { IUser } from '../common/models/user/IUser';

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
  organizationId: string;
  firstname: string;
  lastname: string;
  id: string;
  currentOrganization: IUserOrganization;
  newOrganization?: {
    name: string;
    isLoading?: boolean;
    isFailed?: boolean;
  };
}

// develop only
const initialState = {
  isLoading: false,
  isAuthorized: false,
  organizationId: '1',
  firstname: 'Test',
  lastname: 'User',
  id: '1',
  currentOrganization: {
    name: '',
    role: Roles.Viewer
  }
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
          ...payload,
          isLoading: false,
          isFailed: false
        }
      };
    case createOrganizationRoutine.TRIGGER:
      return {
        ...state,
        newOrganization: {
          ...payload,
          isLoading: true,
          isFailed: false
        }
      };
    case createOrganizationRoutine.SUCCESS:
      return {
        ...state,
        newOrganization: {
          ...payload,
          isLoading: false,
          isFailed: false
        }
      };
    default:
      return state;
  }
};

export default user;
