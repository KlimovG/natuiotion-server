import { Module } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService)=>({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        logger: 'advanced-console',
        entities: [process.cwd() + '/../**/*.model.js'],
        synchronize: configService.get<string>('NODE_ENV') === 'production',
        connectorPackage: 'mysql2',
      }),
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}
