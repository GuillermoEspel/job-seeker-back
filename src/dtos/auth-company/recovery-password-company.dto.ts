import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const recoveryPasswordDtoExample: RecoveryPasswordCompanyDto = {
  email: 'test@example.com',
};

export class RecoveryPasswordCompanyDto {
  @ApiProperty({
    description: 'Company email',
    example: recoveryPasswordDtoExample.email,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
