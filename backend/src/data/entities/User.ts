import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Organization } from './Organization';
import { RefreshToken } from './RefreshToken';
import { UserOrganization } from './UserOrganization';

@Entity()
export class User extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[]

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
