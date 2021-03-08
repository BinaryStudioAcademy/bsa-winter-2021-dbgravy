import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { ICreateUser } from '../../common/models/user/ICreateUser';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  addUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);
    return user.save();
  }

  getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}

export default UserRepository;
