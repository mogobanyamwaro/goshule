import { CacheModule, Module } from '@nestjs/common';
import { BackendCoreModule } from '@go-shule/backend/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BackendCoreModule, CacheModule.register({ ttl: 60 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
