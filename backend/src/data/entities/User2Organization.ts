import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Role } from '../../common/enums/Role';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus';
import { User } from './User';
import { Organization } from './Organization';
import { App } from './App';

@Entity()
export class User2Organization extends AbstractEntity {
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'enum', enum: OrganizationStatus })
  status: OrganizationStatus;

  @OneToMany(() => App, app => app.updatedByUserId)
  apps: App[];

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne(() => Organization, organization => organization.id)
  @JoinColumn({ name: 'organizationId' })
  organizationId: Organization;
}
