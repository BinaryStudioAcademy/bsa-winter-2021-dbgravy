import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { App } from './App';
import { Resource } from './Resource';
import { Trigger } from './Trigger';

@Entity()
export class Query extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  runAutomatically: boolean;

  @Column()
  code: string;

  @Column()
  showConfirm: boolean;

  @OneToMany(() => Trigger, trigger => trigger.query)
  triggers: Trigger[];

  @RelationId((query: Query) => query.app)
  @Column()
  readonly appId: string;

  @ManyToOne(() => App, app => app.queries)
  app: App;

  @RelationId((query: Query) => query.resource)
  @Column()
  readonly resourceId: string;

  @ManyToOne(() => Resource, resource => resource.queries)
  resource: Resource;
}
