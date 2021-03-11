import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column()
  expiration: Date;

  @Column()
  value: string;

  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;
}
