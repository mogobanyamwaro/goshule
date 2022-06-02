import { Module } from '@nestjs/common';
import { ProductsController } from './payments.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  exports: [],
})
export class BackendProductsModule {}
