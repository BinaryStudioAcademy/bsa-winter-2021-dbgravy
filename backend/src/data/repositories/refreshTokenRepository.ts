import { EntityRepository, Repository } from 'typeorm';
import { IRefreshToken } from '../../common/models/tokens/refreshToken';
import { RefreshToken } from '../entities/RefreshToken';
import { User } from '../entities/User';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  saveToken(token: IRefreshToken, user: User) {
    const refreshToken = new RefreshToken();

    refreshToken.expiration = token.expiration;
    refreshToken.id = token.id;
    refreshToken.user = user;
    refreshToken.value = token.value;

    this.save(refreshToken);
  }
}
