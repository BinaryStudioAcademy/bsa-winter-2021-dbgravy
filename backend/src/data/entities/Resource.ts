import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { ResourceType } from '../../common/enums/ResourceType';
import { Organization } from './Organization';
import { Query } from './Query';

@Entity()
export class Resource extends AbstractEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ type: 'enum', enum: ResourceType })
  type: ResourceType;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  dbName: string;

  @Column()
  dbUserName: string;

  @Column()
  dbPassword: string;

  @OneToMany(() => Query, query => query.resourceId)
  queries: Query[];

  @ManyToOne(() => Organization, organization => organization.id)
  @JoinColumn({ name: 'organizationId' })
  organizationId: Organization;
}
