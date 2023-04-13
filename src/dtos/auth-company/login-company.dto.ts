import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const loginCompanyDtoExample: LoginCompanyDto = {
  email: 'test@example.com',
  password: 'pass1234',
};

export class LoginCompanyDto {
  @ApiProperty({
    description: 'Company email',
    example: loginCompanyDtoExample.email,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Company password',
    example: loginCompanyDtoExample.password,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
