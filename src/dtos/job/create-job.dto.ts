import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createJobDtoExample: CreateJobDto = {
  title: 'Title A',
  description: 'Description A',
  companyId: '63d2e28f18828f9cc35369aa',
};

export class CreateJobDto {
  @ApiProperty({
    description: 'Job title',
    example: createJobDtoExample.title,
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Job description',
    example: createJobDtoExample.description,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Job company id',
    example: createJobDtoExample.companyId,
  })
  @IsNotEmpty()
  @IsString()
  readonly companyId: string;
}
