import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { App } from './App';

@Entity()
export class Component extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  top: number;

  @Column()
  left: number;

  @RelationId((component: Component) => component.app)
  @Column()
  readonly appId: string;

  @ManyToOne(() => App, app => app.components)
  app: App;
}
