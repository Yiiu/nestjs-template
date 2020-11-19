import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { UserEntity } from './modules/users/user.entity';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.name,
      entities: [UserEntity],
      logger: 'file',
      logging: true,
      keepConnectionAlive: true,
      synchronize: true,
      migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    };
  }
}
