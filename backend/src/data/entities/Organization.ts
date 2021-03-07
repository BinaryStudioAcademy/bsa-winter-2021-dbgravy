import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';
import { UserOrganization } from './UserOrganization';
import { App } from './App';
import { Resource } from './Resource';

@Entity()
export class Organization extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => User, user => user.currentOrganization)
  users: User[];

  @OneToMany(() => UserOrganization, userOrganization => userOrganization.organization)
  userOrganizations: UserOrganization[];

  @OneToMany(() => App, app => app.organization)
  apps: App[];

  @OneToMany(() => Resource, resource => resource.organization)
  resources: Resource[];

  @RelationId((organization: Organization) => organization.createdByUser)
  @Column()
  readonly createdByUserId: string;

  @ManyToOne(() => User, user => user.organizations)
  createdByUser: User;
}
