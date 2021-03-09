import { EntityRepository, Repository } from 'typeorm';
import { UserOrganization } from '../entities/UserOrganization';

@EntityRepository(UserOrganization)
export class UserOrganizationRepository extends Repository<UserOrganization> {
  async getOrganizationUser(userId: string, organizationId: string): Promise<UserOrganization> {
    const userOrganization: UserOrganization = await this.findOne({ where: { userId, organizationId } });
    return userOrganization;
  }
}
