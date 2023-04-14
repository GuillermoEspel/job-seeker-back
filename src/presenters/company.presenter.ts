import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from '../entities';

const companyPresenterExample: CompanyPresenter = {
  id: '63d2e28f18828f9cc35369aa',
  email: 'test@example.com',
  name: 'Company A',
  logo: 'logo.png',
};

export class CompanyPresenter {
  @ApiProperty({
    description: 'Company ID.',
    example: companyPresenterExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Company email.',
    example: companyPresenterExample.email,
  })
  email: string;

  @ApiProperty({
    description: 'Company name.',
    example: companyPresenterExample.name,
  })
  name: string;

  @ApiProperty({
    description: 'Company logo.',
    example: companyPresenterExample.logo,
  })
  logo: string;

  constructor(company: CompanyEntity) {
    this.id = company.id;
    this.email = company.email;
    this.name = company.name;
    this.logo = company.logo;
  }
}
