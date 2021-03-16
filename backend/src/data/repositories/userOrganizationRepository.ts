import { EntityRepository, Repository } from 'typeorm';
import { UserOrganization } from '../entities/UserOrganization';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus';
import { CustomError } from '../../common/models/error/CustomError';
import { IUserOrganization } from '../../common/models/userOrganization/IUserOrganization';
import { ICreateUserOrganization } from '../../common/models/userOrganization/ICreateUserOrganization';
import { IUpdateUserOrganization } from '../../common/models/userOrganization/IUpdateUserOrganization';
import { Role } from '../../common/enums/Role';

@EntityRepository(UserOrganization)
class UserOrganizationRepository extends Repository<UserOrganization> {
  select = [
    'user_organization.id',
    'user_organization.organizationId',
    'user_organization.role',
    'user_organization.status',
    'user.id',
    'user.email',
    'user.firstName',
    'user.lastName'
  ];
  async addUserOrganization(userId: string, data: ICreateUserOrganization): Promise<IUserOrganization> {
    const userOrganization = await this.findOne({ where: { userId, organizationId: data.organizationId } });
    if (userOrganization) {
      throw new CustomError('User already invited.', 400);
    }
    const { role, status } = data;
    const userOrganizationData = this.create(
      {
        role,
        status,
        userId,
        organizationId: data.organizationId
      }
    );
    const newUserOrganization = await userOrganizationData.save();

    const { id } = newUserOrganization;
    const response = await this.createQueryBuilder('user_organization')
      .select(this.select)
      .where('user_organization.id = :id', { id })
      .leftJoin('user_organization.user', 'user')
      .getOne();

    return response;
  }

  async getUsers(organizationId: string): Promise<IUserOrganization[]> {
    const users = await this.createQueryBuilder('user_organization')
      .select(this.select)
      .where('user_organization.organizationId = :organizationId', { organizationId })
      .leftJoin('user_organization.user', 'user')
      .getMany();

    return users;
  }

  async getUserOrganization(organizationId: string, userId: string): Promise<IUserOrganization> {
    const response = await this.createQueryBuilder('user_organization')
      .select(this.select)
      .where('user_organization.userId = :userId', { userId })
      .andWhere('user_organization.organizationId = :organizationId', { organizationId })
      .leftJoin('user_organization.user', 'user')
      .getOne();

    return response;
  }

  async updateUserOrganization(data: IUpdateUserOrganization): Promise<IUserOrganization> {
    const { userId, organizationId } = data;
    const userOrganization = await this.findOne({ where: { userId, organizationId } });
    if (!userOrganization) {
      throw new CustomError('User organization not found.', 404);
    }
    const { id } = userOrganization;
    await this.update(id, data);
    const response = await this.createQueryBuilder('user_organization')
      .select(this.select)
      .where('user_organization.id = :id', { id })
      .leftJoin('user_organization.user', 'user')
      .getOne();

    return response;
  }
  async getOrganizationUser(userId: string, organizationId: string): Promise<UserOrganization> {
    const userOrganization: UserOrganization = await this.findOne({ where: { userId, organizationId } });
    return userOrganization;
  }

  async getOrganizationUserByUserIdByStatus(
    userId: string,
    organizationId: string,
    status: string
  ): Promise<UserOrganization> {
    const userOrganization: UserOrganization = await this.findOne({
      where: {
        userId,
        organizationId,
        status
      } });
    return userOrganization;
  }

  async addUserOrganizationOwner(userId: string, organizationId: string): Promise<UserOrganization> {
    const userOrganization = {
      userId,
      organizationId,
      status: OrganizationStatus.ACTIVE,
      role: Role.ADMIN
    };

    const response = await this.create(userOrganization).save();
    return response;
  }
}

export default UserOrganizationRepository;
