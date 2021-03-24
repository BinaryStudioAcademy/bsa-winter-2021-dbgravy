import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';
import { Query } from './Query';

@Entity()
export class Button extends AbstractEntity {
  @RelationId((button: Button) => button.component)
  @Column()
  readonly componentId: string;

  @RelationId((button: Button) => button.query)
  @Column()
  readonly queryId: string

  @Column()
  text: string

  @Column()
  color: string

  @OneToOne(() => Component)
  @JoinColumn()
  public component: Component;

  @ManyToOne(() => Query, query => query.table)
  query: Query;
}
