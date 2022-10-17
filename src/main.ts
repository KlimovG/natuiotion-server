import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './utils/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .setGlobalPrefix('api')
    .listen(Number(PORT))
    .then(() => console.log('Server started on port = ' + PORT));
}

bootstrap();
