import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { App } from './App';
import { User2Organization } from './User2Organization';
import { Resource } from './Resource';

@Entity()
export class Organization extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => User, user => user.currentOrganizationId)
  @JoinColumn({ name: 'id' })
  users!: User[];

  @Column()
  name: string;

  @OneToMany(
    () => User2Organization,
    user2Organization => user2Organization.organizationId
  )
  user2Organizations: User2Organization[];

  @OneToMany(() => App, app => app.organizationId)
  apps: App[];

  @OneToMany(() => Resource, resource => resource.organizationId)
  resources: Resource[];

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;
}
