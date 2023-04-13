import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const updateApplicantDtoExample: UpdateApplicantDto = {
  password: 'pass1234',
};

export class UpdateApplicantDto {
  @ApiProperty({
    description: 'Applicant logo',
    example: updateApplicantDtoExample.password,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
