import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';
import { Organization } from './Organization';
import { UserOrganization } from './UserOrganization';
import { Query } from './Query';

@Entity()
export class App extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Component, component => component.app)
  components: Component[];

  @OneToMany(() => Query, query => query.app)
  queries: Query[];

  @RelationId((app: App) => app.organization)
  @Column()
  readonly organizationId: string;

  @ManyToOne(() => Organization, organization => organization.apps)
  organization: Organization;

  @RelationId((app: App) => app.updatedByUser)
  @Column()
  readonly updatedByUserId: string;

  @ManyToOne(() => UserOrganization, userOrganization => userOrganization.apps)
  updatedByUser: UserOrganization;
}
