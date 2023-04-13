import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const getJobsDtoExample: GetJobsDto = {
  title: 'Title A',
};

export class GetJobsDto {
  @ApiProperty({
    description: 'Job title',
    example: getJobsDtoExample.title,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
