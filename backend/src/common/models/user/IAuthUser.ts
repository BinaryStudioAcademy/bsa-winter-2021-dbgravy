import { ITransportedUser } from './ITransportedUser';

export interface IAuthUser {
    user: ITransportedUser
    accessToken: string
    refreshToken: string
}
