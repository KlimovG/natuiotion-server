import * as dotenv from 'dotenv';

dotenv.config();
// XXX
// export const databaseProviders: Provider<any>[] = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         host: DB_HOST,
//         port: Number(DB_PORT),
//         username: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         entities: [__dirname + '/../**/*.model.js'],
//         synchronize: NODE_ENV !== 'production',
//         connectorPackage: 'mysql2',
//       });
//
//       return dataSource.initialize();
//     },
//   },
// ];
