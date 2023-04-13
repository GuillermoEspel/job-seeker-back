import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createJobDtoExample: CreateJobDto = {
  title: 'Title A',
  description: 'Description A',
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
}
