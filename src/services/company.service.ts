import { Injectable, Logger } from '@nestjs/common';
import { CompanyEntity } from '../entities';
import { CreateCompanyDto, GetCompaniesDto, UpdateCompanyDto } from '../dtos';
import { CompanyRepository } from '../repositories';
import { HashService } from './hash.service';
import {
  CreateCompanyException,
  DeleteCompanyByIdException,
  GetCompaniesException,
  GetCompanyByIdException,
  UpdateCompanyByIdException,
} from '../exceptions';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private hashService: HashService,
  ) {}

  async createCompany(dto: CreateCompanyDto): Promise<CompanyEntity> {
    try {
      const { email, password } = dto;
      const company = await this.companyRepository.getByEmail(email);
      if (company) throw new Error('Company already exists.');

      const hashedPassword = this.hashService.hash(password);
      const newCompanyId = await this.companyRepository.create({
        email,
        password: hashedPassword,
        name: dto.name,
        logo: dto.logo,
      });
      const newCompany = await this.companyRepository.getById(newCompanyId);
      return newCompany;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateCompanyException();
    }
  }

  async getCompanyById(id: string): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository.getById(id);
      if (!company) throw new Error('Company not found.');
      return company;
    } catch (error) {
      Logger.error(error.message);
      throw new GetCompanyByIdException();
    }
  }

  async getCompanies(dto: GetCompaniesDto): Promise<CompanyEntity[]> {
    try {
      const companies = await this.companyRepository.getAll();
      return companies;
    } catch (error) {
      Logger.error(error.message);
      throw new GetCompaniesException();
    }
  }

  async updateCompanyById(id: string, dto: UpdateCompanyDto): Promise<void> {
    try {
      const company = await this.companyRepository.getById(id);
      if (!company) throw new Error('Company not found.');

      await this.companyRepository.updateById(id, {
        logo: dto.logo,
      });
    } catch (error) {
      Logger.error(error.message);
      throw new UpdateCompanyByIdException();
    }
  }

  async deleteCompanyById(id: string): Promise<void> {
    try {
      // TODO: Implement
    } catch (error) {
      Logger.error(error.message);
      throw new DeleteCompanyByIdException();
    }
  }
}
