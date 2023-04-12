import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { EnvironmentConfigService } from '../config';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: EnvironmentConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const { database, uri } = this.configService.getMongoDatabaseConfig();
    return { uri, dbName: database };
  }
}
