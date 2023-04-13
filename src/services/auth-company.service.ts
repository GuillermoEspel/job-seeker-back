import { Injectable } from '@nestjs/common';
import { AuthTokensEntity } from '../entities';
import {
  LoginDto,
  RecoveryPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dtos';

@Injectable()
export class AuthCompanyService {
  async login(dto: LoginDto): Promise<AuthTokensEntity> {
    // TODO: Implement
    return { token: 'token', refreshToken: 'refreshToken' };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthTokensEntity> {
    // TODO: Implement
    return { token: 'token', refreshToken: 'refreshToken' };
  }

  async recoveryPassword(dto: RecoveryPasswordDto): Promise<void> {
    // TODO: Implement
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    // TODO: Implement
  }
}
