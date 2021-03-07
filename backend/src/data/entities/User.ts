import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Organization } from './Organization';
import { UserOrganization } from './UserOrganization';

@Entity()
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Organization, organization => organization.createdByUser)
  organizations: Organization[];

  @OneToMany(() => UserOrganization, userOrganization => userOrganization.user)
  userOrganizations: UserOrganization[];

  @RelationId((user: User) => user.currentOrganization)
  @Column()
  readonly currentOrganizationId: string;

  @ManyToOne(() => Organization, organization => organization.users)
  currentOrganization: Organization;
}
