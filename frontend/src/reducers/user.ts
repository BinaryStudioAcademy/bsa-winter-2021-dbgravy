import { Routine } from 'redux-saga-routines';
import { Roles } from '../common/enums/UserRoles';
import { IUserOrganization } from '../common/models/user/IUserOrganization';
import { fetchOrgInfoRoutine, createOrganizationRoutine } from '../containers/ProfilePopup/routines';

export interface IUserState {
  isAuthorized: boolean;
  organizationId: string;
  firstname: string;
  lastname: string;
  id: string;
  currentOrganization: IUserOrganization;
  newOrganization?: {
    name: string
    isLoading?: boolean,
    isFailed?: boolean
  }
}

// develop only
const initialState = {
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
  state: IUserState = initialState,
  action: Routine<any>
): IUserState => {
  switch (action.type) {
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
          ...action.payload,
          isLoading: false,
          isFailed: false
        }
      };
    case createOrganizationRoutine.TRIGGER:
      return {
        ...state,
        newOrganization: {
          ...action.payload,
          isLoading: true,
          isFailed: false
        }
      };
    case createOrganizationRoutine.SUCCESS:
      return {
        ...state,
        newOrganization: {
          ...action.payload,
          isLoading: false,
          isFailed: false
        }
      };
    default:
      return state;
  }
};
