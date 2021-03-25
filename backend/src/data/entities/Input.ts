import { Column, Entity, JoinColumn, OneToOne, RelationId, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';
import { Query } from './Query';

@Entity()
export class Input extends AbstractEntity {
  @RelationId((input: Input) => input.component)
  @Column()
  readonly componentId: string;

  @Column()
  label: string

  @RelationId((input: Input) => input.query)
  @Column({ nullable: true })
  readonly queryId: string

  @Column()
  placeholder: string

  @OneToOne(() => Component, { onDelete: 'CASCADE' })
  @JoinColumn()
  public component: Component;

  @ManyToOne(() => Query, query => query.table)
  query: Query;
}
