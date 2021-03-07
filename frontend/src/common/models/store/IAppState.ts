import { IUserState } from '../../../reducers/user';
import { Roles } from '../../enums/UserRoles';
import { IUser } from '../user/IUser';

export interface IAppState {
  user: IUserState;
  settings: {
    users: IUser[],
    isLoading: boolean,
    isFailed: boolean,
    userChanges: {
      id?: string
      email?: string,
      role?: Roles
    },
    showModal: boolean
  };
}
