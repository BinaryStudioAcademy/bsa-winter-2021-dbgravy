import { IUserState } from '../../../reducers/user';
import { IAppsState } from '../../../reducers/apps';
import { IResourcesState } from '../../../reducers/resources';
import { Roles } from '../../enums/UserRoles';
import { Status } from '../../enums/UserStatus';
import { IUser } from '../user/IUser';
import { IQueryState } from '../query/IQueryState';
import { IInviteToOrganization } from '../userOrganization/IInviteToOrganization';
import { IQueryState } from '../../../reducers/queries';

export interface IAppState {
  user: IUserState;
<<<<<<< HEAD
  query: IQueryState;
  application: IAppsState;
=======
  app: {
    qur: IQueryState,
    application: IAppsState
  }
>>>>>>> 3f9df4ef0dd29b451d2118339d66774fc876e80b
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
