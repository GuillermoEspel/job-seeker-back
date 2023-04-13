import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createApplicationDtoExample: CreateApplicationDto = {
  jobId: '63d2e28f18828f9cc35369aa',
  applicantId: '63d2e28f18828f9cc35369aa',
};

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Job ID',
    example: createApplicationDtoExample.jobId,
  })
  @IsNotEmpty()
  @IsString()
  readonly jobId: string;

  @ApiProperty({
    description: 'Applicant ID',
    example: createApplicationDtoExample.applicantId,
  })
  @IsNotEmpty()
  @IsString()
  readonly applicantId: string;
}