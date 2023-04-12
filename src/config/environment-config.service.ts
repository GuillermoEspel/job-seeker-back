import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  port: number;
}

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getAppConfig(): AppConfig {
    return {
      port: this.configService.get<number>('PORT'),
    };
  }
}
