// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// // import {
// //   DB_HOST,
// //   DB_NAME,
// //   DB_PASSWORD,
// //   DB_PORT,
// //   DB_USER,
// //   NODE_ENV,
// // } from './database.config';
// //
// // @Module({
// //   imports: [
// //     TypeOrmModule.forRoot({
// //       type: 'mysql',
// //       host: DB_HOST,
// //       port: Number(DB_PORT),
// //       username: DB_USER,
// //       password: DB_PASSWORD,
// //       database: DB_NAME,
// //       entities: [__dirname + '/../**/*.model.js'],
// //       synchronize: NODE_ENV !== 'production',
// //       connectorPackage: 'mysql2',
// //     }),
// //   ],
// //   exports: [
// //     TypeOrmModule.forRoot({
// //       type: 'mysql',
// //       host: DB_HOST,
// //       port: Number(DB_PORT),
// //       username: DB_USER,
// //       password: DB_PASSWORD,
// //       database: DB_NAME,
// //       entities: ['dist/../**/*.model.js'],
// //       synchronize: NODE_ENV !== 'production',
// //       connectorPackage: 'mysql2',
// //     }),
// //   ],
// // })
// // export class DatabaseModule {
// //   constructor() {
// //     console.log(__dirname + '/../**/*.model.js');
// //   }
// // }
