import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { ApiModule } from './api.module';

import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import TypeOrmConfigService from './typeorm.config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        ttl: configService.get('cacheTtl'),
        ...configService.get('redis'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
      envFilePath: ['env.production', '.env.development', '.env'],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
