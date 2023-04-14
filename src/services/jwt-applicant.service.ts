import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService, JwtApplicantConfig } from '../config';
import { JwtService } from '@nestjs/jwt';
import { AuthApplicantPayload } from '../interfaces';

@Injectable()
export class JWTApplicantService {
  private config: JwtApplicantConfig;

  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.config = this.configService.getJwtApplicantConfig();
  }

  generateToken(payload: AuthApplicantPayload): string {
    const { expiresIn, secret } = this.config;
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  verifyToken(token: string): AuthApplicantPayload {
    const { secret } = this.config;
    return this.jwtService.verify(token, { secret });
  }

  generateRefreshToken(payload: AuthApplicantPayload): string {
    const { refreshExpiresIn, refreshSecret } = this.config;
    return this.jwtService.sign(payload, {
      expiresIn: refreshExpiresIn,
      secret: refreshSecret,
    });
  }

  verifyRefreshToken(token: string): AuthApplicantPayload {
    const { refreshSecret } = this.config;
    return this.jwtService.verify(token, { secret: refreshSecret });
  }
}
