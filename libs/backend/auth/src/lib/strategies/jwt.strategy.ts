import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@go-shule/backend/users';
import { JwtPayload } from '../types';
import { UserStatus } from '@go-shule/backend/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      };
    }

    if (user.status === UserStatus.INACTIVE) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'User is disabled',
      };
    }

    if (user.status === UserStatus.SUSPENDED) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'User is suspended',
      };
    }

    if (user.status === UserStatus.BLOCKED) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'User is blocked',
      };
    }

    return user;
  }
}
