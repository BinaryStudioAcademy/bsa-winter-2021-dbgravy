import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column()
  expiration: Date;

  @Column()
  value: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
