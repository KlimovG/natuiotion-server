import * as dotenv from 'dotenv';

dotenv.config();

export const { JWT_SECRET: secret, JWT_EXPIRATION } = process.env;
