import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Query } from './Query';

@Entity()
export class Trigger extends BaseEntity {
  @PrimaryColumn()
  queryId: string;

  @PrimaryColumn()
  triggerQueryId: string;

  @Column()
  success: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Query, query => query.id)
  @JoinColumn({ name: 'queryId' })
  query!: Query;

  @ManyToOne(() => Query, query => query.id)
  @JoinColumn({ name: 'triggerQueryId' })
  triggerQuery!: Query;
}
