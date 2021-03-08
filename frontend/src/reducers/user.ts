import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, loginUserRoutine, addNewUserRoutine } from '../scenes/Auth/routines';
import { IUser } from '../common/models/user/IUser';

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean,
  organizationId?: string
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false
};

export const user = (state = initialState, { type, payload }: Routine<any>): IUserState => {
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
        fullName,
        email
      } = payload;
      return {
        ...state,
        user: {
          id,
          fullName,
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
    default:
      return state;
  }
};

export default user;
