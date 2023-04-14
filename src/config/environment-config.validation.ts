import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  // Application
  @IsNumber()
  PORT: number;
  @IsString()
  VERSION: string;

  // Mongo Database
  @IsString()
  MONGO_URI: string;
  @IsString()
  MONGO_DATABASE: string;

  // JWT Applicant
  @IsString()
  JWT_APPLICANT_SECRET: string;
  @IsString()
  JWT_APPLICANT_EXPIRES_IN: string;
  @IsString()
  JWT_APPLICANT_REFRESH_SECRET: string;
  @IsString()
  JWT_APPLICANT_REFRESH_EXPIRES_IN: string;

  // JWT Company
  @IsString()
  JWT_COMPANY_SECRET: string;
  @IsString()
  JWT_COMPANY_EXPIRES_IN: string;
  @IsString()
  JWT_COMPANY_REFRESH_SECRET: string;
  @IsString()
  JWT_COMPANY_REFRESH_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
}
