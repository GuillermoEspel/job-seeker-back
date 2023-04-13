import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../entities';
import { CreateCompanyDto, GetCompaniesDto, UpdateCompanyDto } from '../dtos';

@Injectable()
export class CompanyService {
  async createCompany(dto: CreateCompanyDto): Promise<string> {
    // TODO: Implement
    return 'uuid';
  }

  async getCompanyById(id: string): Promise<CompanyEntity> {
    // TODO: Implement
    return {
      id: 'uuid',
      name: 'Company A',
      logo: 'logo.png',
    };
  }

  async getCompanies(dto: GetCompaniesDto): Promise<CompanyEntity[]> {
    // TODO: Implement
    return [
      {
        id: 'uuid',
        name: 'Company A',
        logo: 'logo.png',
      },
    ];
  }

  async updateCompanyById(id: string, dto: UpdateCompanyDto): Promise<void> {
    // TODO: Implement
  }

  async deleteCompanyById(id: string): Promise<void> {
    // TODO: Implement
  }
}
