import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../config';
import { MongoConfig } from './mongo-database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useClass: MongoConfig,
    }),
  ],
})
export class MongoDatabaseModule {}
