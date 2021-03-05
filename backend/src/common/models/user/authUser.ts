import { ITransportedUser } from './transportedUser';

export interface IAuthUser {
    user: ITransportedUser
    accessToken: string
    refreshToken: string
}
