import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Organization } from './Organization';
import { User2Organization } from './User2Organization';

@Entity()
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Organization, organization => organization.createdBy)
  organizations: Organization[];

  @OneToMany(() => User2Organization, user2Organization => user2Organization.userId)
  user2Organizations: User2Organization[];

  @ManyToOne(() => Organization, organization => organization.id)
  @JoinColumn({ name: 'currentOrganizationId' })
  currentOrganizationId: Organization;
}
