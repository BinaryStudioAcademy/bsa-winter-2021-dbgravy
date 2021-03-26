import { IUserState } from '../../reducers/user';
import { store } from '../../store';
import { Roles } from '../enums/UserRoles';
import { Status } from '../enums/UserStatus';

export const isAccess = (roles: Roles[]): boolean => {
  const rootState = store.getState();
  const { user }: IUserState = rootState.user;
  return (!!roles.some(userRole => user.role === userRole && user.status === Status.Active)
  );
};
