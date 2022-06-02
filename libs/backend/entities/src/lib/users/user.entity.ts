import { Exclude } from 'class-transformer';
import { UserRole } from 'libs/backend/enums/src';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    name: 'password',
  })
  password: string;
  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARENT,
  })
  role: UserRole;

  @Column({
    name: 'is_admin',
    default: false,
  })
  isAdmin: boolean;
}
