import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { App } from './App';
import { Button } from './Button';
import { Resource } from './Resource';
import { Table } from './Table';
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

  @ManyToOne(() => App, app => app.queries,{
    cascade: true,
    onDelete: 'CASCADE',
    primary: true
  })
  app: App;

  @RelationId((query: Query) => query.resource)
  @Column()
  readonly resourceId: string;

  @ManyToOne(() => Resource, resource => resource.queries)
  resource: Resource;

  @OneToMany(() => Table, table => table.query)
  table: Query[];

  @OneToMany(() => Button, button => button.query)
  button: Button[];
}
