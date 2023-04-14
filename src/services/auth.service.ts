import { Injectable, Logger } from '@nestjs/common';
import { AuthTokensEntity } from '../entities';
import {
  LoginDto,
  RecoveryPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dtos';
import { ApplicantRepository } from '../repositories';
import { HashService } from './hash.service';
import { JWTApplicantService } from './jwt-applicant.service';
import { AuthApplicantPayload } from '../interfaces';
import {
  LoginApplicantException,
  RefreshTokenApplicantException,
} from '../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private applicantRepository: ApplicantRepository,
    private hashService: HashService,
    private jwtService: JWTApplicantService,
  ) {}

  async login(dto: LoginDto): Promise<AuthTokensEntity> {
    try {
      const { email, password } = dto;
      const applicant = await this.applicantRepository.getByEmail(email);
      if (!applicant) throw new Error('Applicant not found.');

      const isAuthorized = this.hashService.compare(
        password,
        applicant.password,
      );
      if (!isAuthorized) throw new Error('Invalid password.');

      const payload: AuthApplicantPayload = {
        id: applicant.id,
      };
      const token = this.jwtService.generateToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);
      return { token, refreshToken };
    } catch (error) {
      Logger.error(error.message);
      throw new LoginApplicantException();
    }
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthTokensEntity> {
    try {
      const payloadOld = this.jwtService.verifyRefreshToken(dto.refreshToken);
      const payload: AuthApplicantPayload = {
        id: payloadOld.id,
      };
      const token = this.jwtService.generateToken(payload);
      const refreshToken = this.jwtService.generateRefreshToken(payload);
      return { token, refreshToken };
    } catch (error) {
      Logger.error(error.message);
      throw new RefreshTokenApplicantException();
    }
  }

  async recoveryPassword(dto: RecoveryPasswordDto): Promise<void> {
    // TODO: Implement
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    // TODO: Implement
  }
}
