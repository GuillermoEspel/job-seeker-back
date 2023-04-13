import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../enums';

const getApplicationsDtoExample: GetApplicationsDto = {
  status: ApplicationStatus.IN_PROGRESS,
};

export class GetApplicationsDto {
  @ApiProperty({
    description: 'Application status',
    example: getApplicationsDtoExample.status,
    enum: ApplicationStatus,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  readonly status: ApplicationStatus;
}
