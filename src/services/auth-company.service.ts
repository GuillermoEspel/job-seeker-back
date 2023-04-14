import { Injectable, Logger } from '@nestjs/common';
import { AuthTokensEntity } from '../entities';
import {
  LoginDto,
  RecoveryPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dtos';
import { CompanyRepository } from '../repositories';
import { HashService } from './hash.service';
import { JWTCompanyPanyService } from './jwt-company.service';
import { AuthCompanyPayload } from '../interfaces';
import {
  LoginCompanyException,
  RefreshTokenCompanyException,
} from '../exceptions';

@Injectable()
export class AuthCompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private hashService: HashService,
    private jwtService: JWTCompanyPanyService,
  ) {}

  async login(dto: LoginDto): Promise<AuthTokensEntity> {
    try {
      const { email, password } = dto;
      const company = await this.companyRepository.getByEmail(email);
      if (!company) throw new Error('Company not found.');

      const isAuthorized = this.hashService.compare(password, company.password);
      if (!isAuthorized) throw new Error('Invalid password.');

      const payload: AuthCompanyPayload = {
        id: company.id,
      };
      const token = this.jwtService.generateToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);
      return { token, refreshToken };
    } catch (error) {
      Logger.error(error.message);
      throw new LoginCompanyException();
    }
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthTokensEntity> {
    try {
      const payloadOld = this.jwtService.verifyRefreshToken(dto.refreshToken);
      const payload: AuthCompanyPayload = {
        id: payloadOld.id,
      };
      const token = this.jwtService.generateToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);
      return { token, refreshToken };
    } catch (error) {
      Logger.error(error.message);
      throw new RefreshTokenCompanyException();
    }
  }

  async recoveryPassword(dto: RecoveryPasswordDto): Promise<void> {
    // TODO: Implement
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    // TODO: Implement
  }
}
