import { Column, Entity, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { App } from './App';
import { Button } from './Button';
import { Input } from './Input';
import { Table } from './Table';
import { Text } from './Text';

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

  @OneToOne(() => Table, table => table.component)
  table: Table

  @OneToOne(() => Input, input => input.component)
  input: Input

  @OneToOne(() => Button, button => button.component)
  button: Button

  @OneToOne(() => Text, text => text.component)
  text: Text
}
