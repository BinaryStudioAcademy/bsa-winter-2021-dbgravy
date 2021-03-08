import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Role } from '../../common/enums/Role';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus';
import { User } from './User';
import { Organization } from './Organization';
import { App } from './App';

@Entity()
export class UserOrganization extends AbstractEntity {
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'enum', enum: OrganizationStatus })
  status: OrganizationStatus;

  @OneToMany(() => App, app => app.updatedByUser)
  apps: App[];

  @RelationId((userOrganization: UserOrganization) => userOrganization.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, user => user.userOrganizations)
  user: User;

  @RelationId((userOrganization: UserOrganization) => userOrganization.organization)
  @Column()
  readonly organizationId: string;

  @ManyToOne(() => Organization, organization => organization.userOrganizations)
  organization: Organization;
}
