import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @OneToMany(() => Trigger, trigger => trigger.queryId)
  triggers: Trigger[];

  @OneToMany(() => Trigger, trigger => trigger.triggerQueryId)
  queryTriggers: Trigger[];

  @ManyToOne(() => App, app => app.id)
  @JoinColumn({ name: 'appId' })
  appId: App;

  @ManyToOne(() => Resource, resource => resource.id)
  @JoinColumn({ name: 'resourceId' })
  resourceId: App;
}
