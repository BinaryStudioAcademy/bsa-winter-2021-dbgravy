import { IUserState } from '../../../reducers/user';
import { Roles } from '../../enums/UserRoles';
import { Status } from '../../enums/UserStatus';
import { IUser } from '../user/IUser';
import { IInviteToOrganization } from '../userOrganization/IInviteToOrganization';

export interface IAppState {
  user: IUserState;
  settings: {
    users: IUser[],
    isLoading: boolean,
    isFailed: boolean,
    userChanges: {
      id?: string
      email?: string,
      role?: Roles,
      status?: Status,
      isLoading?: boolean,
      isFailed?: boolean
    },
    showModal: boolean,
    inviteToOrganization: IInviteToOrganization
  };
}
