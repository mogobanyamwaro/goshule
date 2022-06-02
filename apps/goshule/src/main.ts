import * as cookieParser from 'cookie-parser';
import * as winston from 'winston';
import { WinstonModule, utilities as WinstonUtilities } from 'nest-winston';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();
  const port = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: WinstonUtilities.format.nestLike('Goshule', {
            prettyPrint: true,
          }),
        }),
      ],
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.enableShutdownHooks();
  app.enableCors();
  app.use(cookieParser());
  app.use(compression());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const description = `search for schools , products and read blogs`;

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Goshule')
      .setDescription(description)
      .setVersion('1.0')
      .addTag('schools')
      .addTag('products')
      .addTag('blogs')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🚀 To accesss swagger: http://localhost:${port}/${globalPrefix}/docs`
  );
}

bootstrap();
