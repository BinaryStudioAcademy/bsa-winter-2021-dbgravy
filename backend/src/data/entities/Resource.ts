import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { ResourceType } from '../../common/enums/ResourceType';
import { Organization } from './Organization';
import { Query } from './Query';

@Entity()
export class Resource extends AbstractEntity {
  @Column()
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

  @OneToMany(() => Query, query => query.resource)
  queries: Query[];

  @RelationId((resource: Resource) => resource.organization)
  @Column()
  readonly organizationId: string;

  @ManyToOne(() => Organization, organization => organization.resources)
  organization: Organization;
}
