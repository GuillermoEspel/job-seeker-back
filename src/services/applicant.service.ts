import { Injectable, Logger } from '@nestjs/common';
import { ApplicantEntity } from '../entities';
import {
  CreateApplicantDto,
  GetApplicantsDto,
  UpdateApplicantDto,
} from '../dtos';
import { ApplicantRepository } from '../repositories';
import {
  CreateApplicantException,
  GetApplicantByIdException,
} from '../exceptions';

@Injectable()
export class ApplicantService {
  constructor(private applicantRepository: ApplicantRepository) {}

  async createApplicant(dto: CreateApplicantDto): Promise<string> {
    try {
      const { email, password } = dto;
      const applicant = await this.applicantRepository.getByEmail(email);
      if (applicant) throw new Error('Applicant already exists.');
      // TODO: hash password
      const newApplicantId = await this.applicantRepository.create(dto);
      return newApplicantId;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateApplicantException();
    }
  }

  async getApplicants(dto: GetApplicantsDto): Promise<ApplicantEntity[]> {
    // TODO: Implement
    return [
      {
        id: 'uuid',
        email: 'uuid@example.com',
        password: 'pass123',
      },
    ];
  }

  async getApplicantById(id: string): Promise<ApplicantEntity> {
    try {
      const applicant = await this.applicantRepository.getById(id);
      if (!applicant) throw new Error('User not found.');
      return applicant;
    } catch (error) {
      Logger.error(error.message);
      throw new GetApplicantByIdException();
    }
  }

  async updateApplicantById(
    id: string,
    dto: UpdateApplicantDto,
  ): Promise<void> {
    // TODO: Implement
  }

  async deleteApplicantById(id: string): Promise<void> {
    // TODO: Implement
  }
}
