import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

export const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(PORT));
}

bootstrap();
