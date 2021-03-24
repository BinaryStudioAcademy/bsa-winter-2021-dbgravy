import { EntityRepository, Repository } from 'typeorm';
import { IRegisterUser } from '../../common/models/user/IRegisterUser';
import { IUpdateUser } from '../../common/models/user/IUpdateUser';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: IRegisterUser): Promise<User> {
    const { firstName, lastName, email, password, currentOrganizationId } = user;
    const newUser = currentOrganizationId
      ? { firstName, lastName, email, password, currentOrganizationId }
      : { firstName, lastName, email, password };
    const createdUser = await this.save(newUser);
    return createdUser;
  }

  async updateUser(user: User): Promise<void> {
    const { id } = user;
    await this.update(id, user);
  }

  async updateUserFields(data: IUpdateUser): Promise<void> {
    const { id } = data;
    await this.update(id, data);
  }

  async getAll(): Promise<User[]> {
    const users = await this.find();
    return users;
  }

  async getByEmail(email: string): Promise<User> {
    const user: User = await this.findOne({ email });
    return user;
  }

  async getById(id: string): Promise<User> {
    const user: User = await this.findOne({ id });
    return user;
  }

  async updateCurrentOrganizationId(id: string, currentOrganizationId: string): Promise<User> {
    await this.update(id, { currentOrganizationId });
    return this.getById(id);
  }

  async editPassword(id: string, password: string): Promise<User> {
    await this.update(
      id,
      { password }
    );

    const user = await this.findOne(id);

    return user;
  }
}
