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

  async getByEmail(email: string): Promise<User> {
    const user: User = await this.findOne({ email });
    return user;
  }

  async getById(id: string): Promise<User> {
    const user: User = await this.findOne({ id });
    return user;
  }
}
