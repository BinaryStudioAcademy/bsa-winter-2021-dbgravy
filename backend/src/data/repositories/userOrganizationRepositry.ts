import { EntityRepository, Repository } from 'typeorm';
import { UserOrganization } from '../entities/UserOrganization';
import { IUserOrganizationResponse } from '../../common/models/user_organization/IUserOrganizationResponse';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus';
// import { ICreateUserOrganization } from '../../common/models/user_organization/ICreateUserOrganization';

const formatResponse = (users: any) => {
  const response = users.map((u: any) => {
    const obj = { ...u, ...u.user };
    delete obj.user;
    return obj;
  });
  return response;
};

@EntityRepository(UserOrganization)
class UserOrganizationRepository extends Repository<UserOrganization> {
  async addUserOrganization(userId: string, data: any): Promise<any> {
    const userOrganization = await this.findOne({ where: { userId } });
    if (userOrganization) {
      throw new Error();
    }
    const userOrganizationData = this.create(
      {
        role: data.role,
        status: OrganizationStatus.PENDING,
        userId,
        organizationId: data.organizationId
      }
    );
    return userOrganizationData.save();
  }

  async getUsers(organizationId: string): Promise<IUserOrganizationResponse[]> {
    const users = await this.createQueryBuilder()
      .select([
        'user_organization.organizationId',
        'user_organization.role',
        'user_organization.status',
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName'
      ])
      .from(UserOrganization, 'user_organization')
      .leftJoin('user_organization.user', 'user')
      .where('user_organization.organizationId = :organizationId', { organizationId })
      .getMany();

    return formatResponse(users);
  }
}

export default UserOrganizationRepository;
