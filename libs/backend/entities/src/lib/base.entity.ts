import {
  Entity,
  BaseEntity as Base,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export abstract class BaseEntity extends Base {
  @PrimaryColumn('varchar', {
    length: 50,
  })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
