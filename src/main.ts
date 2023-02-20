import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const logger = new Logger('Bootstrap');

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app
    .setGlobalPrefix('api')
    .listen(Number(port))
    .then(() => logger.log('Server started on port = ' + port));
}

bootstrap();
