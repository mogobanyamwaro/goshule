import { BackendAuthModule } from '@go-shule/backend/auth';
import { BackendPaymentsModule } from '@go-shule/backend/payments';
import { BackendProductsModule } from '@go-shule/backend/products';
import {
  BackendSharedModule,
  DbValidatorsModule,
} from '@go-shule/backend/shared';
import { BackendUsersModule } from '@go-shule/backend/users';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        synchronize: Boolean(process.env.DB_SYNCHRONIZE),
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    DbValidatorsModule.register({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    BackendUsersModule,
    BackendAuthModule,
    BackendProductsModule,
    BackendSharedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendCoreModule {}
