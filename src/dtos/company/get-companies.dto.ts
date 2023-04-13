import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const getCompaniesDtoExample: GetCompaniesDto = {
  name: 'Astor',
};

export class GetCompaniesDto {
  @ApiProperty({
    description: 'Company name',
    example: getCompaniesDtoExample.name,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
