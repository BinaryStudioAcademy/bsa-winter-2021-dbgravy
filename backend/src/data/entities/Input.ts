import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';

@Entity()
export class Input extends AbstractEntity {
  @RelationId((input: Input) => input.component)
  @Column()
  readonly componentId: string;

  @Column()
  label: string

  @Column()
  placeholder: string

  @OneToOne(() => Component)
  @JoinColumn()
  public component: Component;
}
