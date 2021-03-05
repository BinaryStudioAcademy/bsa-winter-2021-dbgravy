import { IToken } from '../jwt/token';
import { IUser } from './user';

export interface IAuthUser {
    user: IUser
    accessToken: IToken
    refreshToken: IToken
}
