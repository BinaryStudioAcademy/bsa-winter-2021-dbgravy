import { IUserState } from '../../../reducers/user';
import { IAppsState } from '../../../reducers/apps';
import { IResourcesState } from '../../../reducers/resources';
import { Roles } from '../../enums/UserRoles';
import { Status } from '../../enums/UserStatus';
import { IUser } from '../user/IUser';
import { IQueryState } from '../query/IQueryState';
import { IInviteToOrganization } from '../userOrganization/IInviteToOrganization';

export interface IAppState {
  user: IUserState;
  app: {
    qur: IQueryState,
    application: IAppsState
  }
  resource: IResourcesState;
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
