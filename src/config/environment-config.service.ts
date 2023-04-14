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

export interface JwtApplicantConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface JwtCompanyConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
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

  getJwtApplicantConfig(): JwtApplicantConfig {
    return {
      secret: this.configService.get<string>('JWT_APPLICANT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_APPLICANT_EXPIRES_IN'),
      refreshSecret: this.configService.get<string>(
        'JWT_APPLICANT_REFRESH_SECRET',
      ),
      refreshExpiresIn: this.configService.get<string>(
        'JWT_APPLICANT_REFRESH_EXPIRES_IN',
      ),
    };
  }

  getJwtCompanyConfig(): JwtCompanyConfig {
    return {
      secret: this.configService.get<string>('JWT_COMPANY_SECRET'),
      expiresIn: this.configService.get<string>('JWT_COMPANY_EXPIRES_IN'),
      refreshSecret: this.configService.get<string>(
        'JWT_COMPANY_REFRESH_SECRET',
      ),
      refreshExpiresIn: this.configService.get<string>(
        'JWT_COMPANY_REFRESH_EXPIRES_IN',
      ),
    };
  }
}
