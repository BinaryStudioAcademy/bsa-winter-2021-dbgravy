import { Routine } from 'redux-saga-routines';

export interface IUserState {
  isAuthorized: boolean;
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
