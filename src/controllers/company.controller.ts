import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from '../services';
import { CreateCompanyDto, GetCompaniesDto, UpdateCompanyDto } from '../dtos';
import { CompanyPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'companies' })
@ApiTags('Companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() body: CreateCompanyDto): Promise<string> {
    return this.companyService.createCompany(body);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok.',
    type: CompanyPresenter,
  })
  async getCompanyById(@Param('id') id: string): Promise<CompanyPresenter> {
    const company = await this.companyService.getCompanyById(id);
    return new CompanyPresenter(company);
  }

  @Get()
  @ApiOkResponse({
    description: 'Ok.',
    type: CompanyPresenter,
    isArray: true,
  })
  async getCompanies(
    @Body() body: GetCompaniesDto,
  ): Promise<CompanyPresenter[]> {
    const companies = await this.companyService.getCompanies(body);
    return companies.map((company) => new CompanyPresenter(company));
  }

  @Put(':id')
  updateCompanyById(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ): Promise<void> {
    return this.companyService.updateCompanyById(id, body);
  }

  @Delete(':id')
  deleteCompanyById(@Param('id') id: string): Promise<void> {
    return this.companyService.deleteCompanyById(id);
  }
}
