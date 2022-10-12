import * as dotenv from 'dotenv';

dotenv.config();

export const { SECRET_JWT: secret } = process.env;
