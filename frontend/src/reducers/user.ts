import { Routine } from 'redux-saga-routines';
import { IUser } from '../common/models/user/IUser';

export interface IUserState {
  user?: IUser;
  isAuthorized: boolean,
  organizationId?: string
}

const initialState = {
  isAuthorized: false
};

export const user = (state: IUserState = initialState, action: Routine<any>): IUserState => {
  switch (action.type) {
    default:
      return state;
  }
};
