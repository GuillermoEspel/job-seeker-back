import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const updateJobDtoExample: UpdateJobDto = {
  description: 'New description',
};

export class UpdateJobDto {
  @ApiProperty({
    description: 'New job description',
    example: updateJobDtoExample.description,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
