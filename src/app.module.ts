import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    CoreModule,
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_ACCESS: Joi.string().required(),
        JWT_ACCESS_EXPIRATION: Joi.number().required(),
        JWT_REFRESH: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.number().required(),
      }),
    }),
  ],
})
export class AppModule {}
