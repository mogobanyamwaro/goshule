import { AccessToken, RefreshToken, User } from '@go-shule/backend/entities';
import { UserService } from '@go-shule/backend/users';
import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginInput } from './dtos/auth.input';
import { addDays, addHours } from 'date-fns';
@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(
    private readonly jwtService: JwtService,
    private moduleRef: ModuleRef,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepo: Repository<AccessToken>
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid Password',
      };
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,

        role: user.role,
        status: user.status,
      },

      { secret: process.env.JWT_REFRESH_TOKEN_SECRET }
    );
    return this.saveTokens(user, refreshToken, accessToken);
  }
  async saveTokens(user: User, refreshToken: string, accessToken: string) {
    const refresh = await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        user,
        token: refreshToken,
        expiresAt: addDays(new Date(), 7),
      })
    );

    const access = await this.accessTokenRepo.save(
      this.accessTokenRepo.create({
        user,
        token: accessToken,
        expiresAt: addHours(new Date(), 6),
      })
    );

    return {
      refreshToken: refresh.token,
      refreshTokenExpiresAt: refresh.expiresAt,
      accessToken: access.token,
      accessTokenExpiresAt: access.expiresAt,
    };
  }
}
