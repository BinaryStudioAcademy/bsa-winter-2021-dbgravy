import { EntityRepository, Repository } from 'typeorm';
import { UserOrganization } from '../entities/UserOrganization';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus';
import { CustomError } from '../../common/models/error/CustomError';
import { IUserOrganization } from '../../common/models/user_organization/IUserOrganization';

@EntityRepository(UserOrganization)
class UserOrganizationRepository extends Repository<UserOrganization> {
  select = [
    'user_organization.organizationId',
    'user_organization.role',
    'user_organization.status',
    'user.id',
    'user.email',
    'user.firstname',
    'user.lastname'
  ];
  async addUserOrganization(userId: string, data: any): Promise<IUserOrganization> {
    const userOrganization = await this.findOne({ where: { userId } });
    if (userOrganization) {
      throw new CustomError('User already invited.', 400);
    }
    const userOrganizationData = this.create(
      {
        role: data.role,
        status: OrganizationStatus.PENDING,
        userId,
        organizationId: data.organizationId
      }
    );
    const newUserOrganization = await userOrganizationData.save();
    const { id } = newUserOrganization;
    const response = await this.createQueryBuilder()
      .select(this.select)
      .from(UserOrganization, 'user_organization')
      .where('user_organization.id = :id', { id })
      .leftJoin('user_organization.user', 'user')
      .getOne();

    return response;
  }

  async getUsers(organizationId: string): Promise<IUserOrganization[]> {
    const users = await this.createQueryBuilder()
      .select(this.select)
      .from(UserOrganization, 'user_organization')
      .where('user_organization.organizationId = :organizationId', { organizationId })
      .leftJoin('user_organization.user', 'user')
      .getMany();

    return users;
  }

  async updateUserOrganization(data: any): Promise<IUserOrganization> {
    const { userId, organizationId } = data;
    const userOrganization = await this.findOne({ where: { userId, organizationId } });
    if (!userOrganization) {
      throw new CustomError('User organization not found.', 404);
    }
    const { id } = userOrganization;
    await this.update(id, data);
    const response = await this.createQueryBuilder()
      .select(this.select)
      .from(UserOrganization, 'user_organization')
      .where('user_organization.id = :id', { id })
      .leftJoin('user_organization.user', 'user')
      .getOne();

    return response;
  }
}

export default UserOrganizationRepository;
