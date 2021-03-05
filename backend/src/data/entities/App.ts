import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Organization } from './Organization';
import { User2Organization } from './User2Organization';
import { Query } from './Query';
import { Component } from './Component';

@Entity()
export class App extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Query, query => query.appId)
  queries: Query[];

  @OneToMany(() => Component, component => component.appId)
  components: Component[];

  @ManyToOne(() => Organization, organization => organization.id)
  @JoinColumn({ name: 'organizationId' })
  organizationId: Organization;

  @ManyToOne(() => User2Organization, user2Organization => user2Organization.id)
  @JoinColumn({ name: 'updatedByUserId' })
  updatedByUserId: Organization;
}
