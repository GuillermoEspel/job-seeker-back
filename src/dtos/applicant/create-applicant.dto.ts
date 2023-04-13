import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createApplicantDtoExample: CreateApplicantDto = {
  email: 'test@example.com',
  password: 'pass1234',
};

export class CreateApplicantDto {
  @ApiProperty({
    description: 'Applicant email',
    example: createApplicantDtoExample.email,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Applicant password',
    example: createApplicantDtoExample.password,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
