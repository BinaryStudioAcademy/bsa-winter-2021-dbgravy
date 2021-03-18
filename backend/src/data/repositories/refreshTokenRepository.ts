import { EntityRepository, Repository } from 'typeorm';
import { CustomError } from '../../common/models/error/CustomError';
import { IRefreshToken } from '../../common/models/tokens/IRefreshToken';
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

  async deleteToken(value: string) {
    try {
      const token = await this.findOne({ where: { value } });
      const deletedToken = this.delete(token.id);
      return deletedToken;
    } catch (e) {
      throw new CustomError(e, 404);
    }
  }

  async findToken(value: string) {
    const token = await this.findOne({ where: { value } });
    return token;
  }
}
