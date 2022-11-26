import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app
    .setGlobalPrefix('api')
    .listen(Number(port))
    .then(() => console.log('Server started on port = ' + port));
}

bootstrap();
