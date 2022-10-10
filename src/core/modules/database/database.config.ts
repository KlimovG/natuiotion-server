import * as dotenv from 'dotenv';

dotenv.config();

export const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME, NODE_ENV } =
  process.env;
