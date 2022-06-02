import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessToken, RefreshToken, User } from '@go-shule/backend/entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BackendUsersModule } from '@go-shule/backend/users';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    forwardRef(() => BackendUsersModule),
    TypeOrmModule.forFeature([AccessToken, RefreshToken, User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [],
})
export class BackendAuthModule {}
