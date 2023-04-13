import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const getApplicantsDtoExample: GetApplicantsDto = {
  email: 'test@example.com',
};

export class GetApplicantsDto {
  @ApiProperty({
    description: 'Company email',
    example: getApplicantsDtoExample.email,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
