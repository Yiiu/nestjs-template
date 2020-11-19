import '../env';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/user.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV !== 'production', // TODO: Remove in production!
  // migrationsRun: true,
  logging: process.env.NODE_ENV !== 'production',
  logger: 'file',
  keepConnectionAlive: true,
  entities: [UserEntity],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
