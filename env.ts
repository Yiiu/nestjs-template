import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path:
    process.env.NODE_ENV === 'production'
      ? resolve(process.cwd(), '.env.production')
      : undefined,
});
