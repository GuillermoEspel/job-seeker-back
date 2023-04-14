import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService, JwtCompanyConfig } from '../config';
import { JwtService } from '@nestjs/jwt';
import { AuthCompanyPayload } from '../interfaces';

@Injectable()
export class JWTCompanyPanyService {
  private config: JwtCompanyConfig;

  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.config = this.configService.getJwtCompanyConfig();
  }

  generateToken(payload: AuthCompanyPayload): string {
    const { expiresIn, secret } = this.config;
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  verifyToken(token: string): AuthCompanyPayload {
    const { secret } = this.config;
    return this.jwtService.verify(token, { secret });
  }

  generateRefreshToken(payload: AuthCompanyPayload): string {
    const { refreshExpiresIn, refreshSecret } = this.config;
    return this.jwtService.sign(payload, {
      expiresIn: refreshExpiresIn,
      secret: refreshSecret,
    });
  }

  verifyRefreshToken(token: string): AuthCompanyPayload {
    const { refreshSecret } = this.config;
    return this.jwtService.verify(token, { secret: refreshSecret });
  }
}
