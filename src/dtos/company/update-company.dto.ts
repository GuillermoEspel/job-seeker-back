import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const updateCompanyDtoExample: UpdateCompanyDto = {
  logo: 'logo.png',
};

export class UpdateCompanyDto {
  @ApiProperty({
    description: 'Company logo',
    example: updateCompanyDtoExample.logo,
  })
  @IsNotEmpty()
  @IsString()
  readonly logo: string;
}
