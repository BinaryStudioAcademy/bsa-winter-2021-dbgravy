import { EntityRepository, Repository } from 'typeorm';
import { IRegisterUser } from '../../common/models/user/IRegisterUser';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: IRegisterUser): Promise<User> {
    const { firstName, lastName, email, password } = user;
    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    await this.save(newUser);
    return newUser;
  }

  async updateUser(user: User): Promise<void> {
    const { id } = user;
    await this.update(id, user);
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
}
