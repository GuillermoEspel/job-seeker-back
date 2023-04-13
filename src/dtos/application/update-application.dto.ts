import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../enums';

const updateApplicationDtoExample: UpdateApplicationDto = {
  status: ApplicationStatus.CLOSED,
};

export class UpdateApplicationDto {
  @ApiProperty({
    description: 'New application status',
    example: updateApplicationDtoExample.status,
    enum: ApplicationStatus,
  })
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  readonly status: ApplicationStatus;
}
