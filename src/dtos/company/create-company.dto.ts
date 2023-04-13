import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createCompanyDtoExample: CreateCompanyDto = {
  name: 'Apex',
  logo: 'logo.png',
};

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: createCompanyDtoExample.name,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Company logo',
    example: createCompanyDtoExample.logo,
  })
  @IsNotEmpty()
  @IsString()
  readonly logo: string;
}
