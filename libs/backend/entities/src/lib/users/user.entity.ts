import { Exclude } from 'class-transformer';
import { UserRole, UserStatus } from '@go-shule/backend/enums';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AccessToken } from '../auth/access-token.entity';
import { Attempt } from '../auth/attempt.entity';
import { RefreshToken } from '../auth/refresh-token.entity';

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

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @OneToMany(() => AccessToken, (accessTokens) => accessTokens.user)
  @JoinColumn({ name: 'user_id' })
  accessTokens: AccessToken[];

  @OneToMany(() => Attempt, (attempts) => attempts.user)
  @JoinColumn({ name: 'user_id' })
  attempts: Attempt[];

  @OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.user)
  @JoinColumn({ name: 'user_id' })
  refreshTokens: RefreshToken[];
}
