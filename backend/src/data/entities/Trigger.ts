import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import { Query } from './Query';

@Entity()
export class Trigger extends BaseEntity {
  @RelationId((trigger: Trigger) => trigger.query)
  @PrimaryColumn()
  readonly queryId: string;

  @RelationId((trigger: Trigger) => trigger.triggerQuery)
  @PrimaryColumn()
  triggerQueryId: string;

  @Column()
  success: boolean;

  @ManyToOne(() => Query, query => query.triggers)
  query: Query;

  @ManyToOne(() => Query, query => query.triggers)
  triggerQuery: Query;
}
