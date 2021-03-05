import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => App, app => app.id)
  @JoinColumn({ name: 'appId' })
  appId: App;
}
