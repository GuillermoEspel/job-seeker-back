import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  port: number;
  basePath: string;
  version: string;
}

interface MongoDatabaseConfig {
  uri: string;
  database: string;
}

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getAppConfig(): AppConfig {
    return {
      port: this.configService.get<number>('PORT'),
      basePath: this.configService.get<string>('BASE_PATH'),
      version: this.configService.get<string>('VERSION'),
    };
  }

  getMongoDatabaseConfig(): MongoDatabaseConfig {
    return {
      uri: this.configService.get<string>('MONGO_URI'),
      database: this.configService.get<string>('MONGO_DATABASE'),
    };
  }
}
