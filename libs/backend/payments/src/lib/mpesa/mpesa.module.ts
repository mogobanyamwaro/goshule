import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MpesaController } from './mpesa.controller';
import { MpesaService } from './mpesa.service';
import { Payment } from '@smartmeter/backend/entities';

@Module({
  imports: [ConfigModule, HttpModule, TypeOrmModule.forFeature([Payment])],
  controllers: [MpesaController],
  providers: [MpesaService],
  exports: [MpesaService],
})
export class MpesaModule {}
