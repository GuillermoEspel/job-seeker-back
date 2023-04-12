import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  port: number;
  basePath: string;
  version: string;
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
}
