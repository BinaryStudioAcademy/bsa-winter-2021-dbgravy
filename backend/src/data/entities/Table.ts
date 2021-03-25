import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Component } from './Component';
import { Query } from './Query';

@Entity()
export class Table extends AbstractEntity {
  @RelationId((table: Table) => table.component)
  @Column()
  readonly componentId: string;

  @RelationId((table: Table) => table.query)
  @Column()
  readonly queryId: string

  @OneToOne(() => Component, { onDelete: 'CASCADE' })
  @JoinColumn()
  public component: Component;

  @ManyToOne(() => Query, query => query.table)
  query: Query;
}
