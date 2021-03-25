import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';

@Entity()
export class Text extends AbstractEntity {
  @RelationId((input: Text) => input.component)
  @Column()
  readonly componentId: string;

  @Column()
  value: string

  @OneToOne(() => Component, { onDelete: 'CASCADE' })
  @JoinColumn()
  public component: Component;
}
