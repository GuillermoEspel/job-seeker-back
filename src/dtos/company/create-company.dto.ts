import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createCompanyDtoExample: CreateCompanyDto = {
  email: 'test@example.com',
  password: 'pass123',
  name: 'Apex',
  logo: 'logo.png',
};

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company email',
    example: createCompanyDtoExample.email,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Company password',
    example: createCompanyDtoExample.password,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

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
