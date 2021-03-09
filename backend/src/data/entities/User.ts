import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Organization } from './Organization';
import { UserOrganization } from './UserOrganization';

@Entity()
export class User extends AbstractEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Organization, organization => organization.createdByUser)
  organizations: Organization[];

  @OneToMany(() => UserOrganization, userOrganization => userOrganization.user)
  userOrganizations: UserOrganization[];

  @RelationId((user: User) => user.currentOrganization)
  @Column({ nullable: true })
  readonly currentOrganizationId: string;

  @ManyToOne(() => Organization, organization => organization.users)
  currentOrganization: Organization;
}
