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
  DeleteApplicantByIdException,
  GetApplicantByIdException,
  GetApplicantsException,
  UpdateApplicantByIdException,
} from '../exceptions';
import { HashService } from './hash.service';

@Injectable()
export class ApplicantService {
  constructor(
    private applicantRepository: ApplicantRepository,
    private hashService: HashService,
  ) {}

  async createApplicant(dto: CreateApplicantDto): Promise<ApplicantEntity> {
    try {
      const { email, password } = dto;
      const applicant = await this.applicantRepository.getByEmail(email);
      if (applicant) throw new Error('Applicant already exists.');

      const hashedPassword = this.hashService.hash(password);
      const newApplicantId = await this.applicantRepository.create({
        email,
        password: hashedPassword,
      });
      const newApplicant = await this.applicantRepository.getById(
        newApplicantId,
      );
      return newApplicant;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateApplicantException();
    }
  }

  async getApplicants(dto: GetApplicantsDto): Promise<ApplicantEntity[]> {
    try {
      const applicants = await this.applicantRepository.getAll();
      return applicants;
    } catch (error) {
      Logger.error(error.message);
      throw new GetApplicantsException();
    }
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
    try {
      const applicant = await this.applicantRepository.getById(id);
      if (!applicant) throw new Error('User not found.');

      const hashedPassword = this.hashService.hash(dto.password);
      await this.applicantRepository.updateById(id, {
        password: hashedPassword,
      });
    } catch (error) {
      Logger.error(error.message);
      throw new UpdateApplicantByIdException();
    }
  }

  async deleteApplicantById(id: string): Promise<void> {
    try {
      // TODO: Implement
    } catch (error) {
      Logger.error(error.message);
      throw new DeleteApplicantByIdException();
    }
  }
}
