import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  name: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
}));
