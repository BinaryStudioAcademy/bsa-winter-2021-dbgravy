import { Routine } from 'redux-saga-routines';
import { Roles } from '../../../common/enums/UserRoles';
import { Status } from '../../../common/enums/UserStatus';
import { IUser } from '../../../common/models/user/IUser';
import { IUserEdit } from '../../../common/models/user/IUserEdit';
import {
  fetchUsersRoutine,
  inviteNewUserRoutine,
  reinviteUserRoutine,
  userActivationRoutine,
  modalShowRoutine,
  inviteUserToOrganizationRoutine
} from '../routines';
import { IInviteToOrganization } from '../../../common/models/userOrganization/IInviteToOrganization';

interface IUserState {
  users: IUser[],
  isLoading: boolean,
  isFailed?: boolean,
  userChanges: IUserEdit
  showModal: boolean,
  inviteToOrganization: IInviteToOrganization
}

const initialState: IUserState = {
  users: [],
  isLoading: true,
  userChanges: {
    isLoading: false,
    isFailed: false
  },
  showModal: false,
  inviteToOrganization: {
    isLoading: false,
    organizationName: '',
    organizationId: '',
    email: '',
    invitedBy: ''
  }
};

export const reducer = (state: IUserState = initialState, { type, payload }: Routine<any>): IUserState => {
  switch (type) {
    case fetchUsersRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true,
        isFailed: false
      };
    case fetchUsersRoutine.SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false
      };
    case fetchUsersRoutine.FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailed: true
      };
    case inviteNewUserRoutine.TRIGGER:
    case reinviteUserRoutine.TRIGGER:
    case userActivationRoutine.TRIGGER:
      return {
        ...state,
        userChanges: { ...payload, isLoading: true, isFailed: false }
      };
    case inviteNewUserRoutine.SUCCESS:
      return {
        ...state,
        users: [...state.users, payload],
        userChanges: { isLoading: false, isFailed: false }
      };
    case reinviteUserRoutine.SUCCESS:
      return {
        ...state,
        userChanges: { isLoading: false, isFailed: false }
      };
    case userActivationRoutine.SUCCESS:
      const idx = state.users.findIndex(({ id }) => payload.id === id);
      const users = [...state.users];
      users.splice(idx, 1, payload);
      return {
        ...state,
        users,
        userChanges: { isLoading: false, isFailed: false }
      };
    case userActivationRoutine.FAILURE:
    case reinviteUserRoutine.FAILURE:
      return {
        ...state,
        userChanges: { ...state.userChanges, isLoading: false, isFailed: true }
      };
    case inviteNewUserRoutine.FAILURE:
      return {
        ...state,
        userChanges: { isLoading: false, isFailed: true }
      };
    case modalShowRoutine.TRIGGER:
      return {
        ...state,
        showModal: payload,
        userChanges: { isLoading: false, isFailed: false }

      };
    case modalShowRoutine.SUCCESS:
      return {
        ...state,
        showModal: false
      };
    case modalShowRoutine.FAILURE:
      return {
        ...state,
        showModal: true
      };
    case inviteUserToOrganizationRoutine.SUCCESS:
      return {
        ...state,
        inviteToOrganization: { ...payload, organizationName: payload.name, isLoading: true }
      };
    case inviteUserToOrganizationRoutine.FAILURE:
      return {
        ...state,
        inviteToOrganization: {
          isLoading: false,
          organizationName: '',
          organizationId: '',
          email: '',
          invitedBy: ''
        }
      };
    default:
      return state;
  }
};
