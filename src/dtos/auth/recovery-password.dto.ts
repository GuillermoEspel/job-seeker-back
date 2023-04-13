import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const recoveryPasswordDtoExample: RecoveryPasswordDto = {
  email: 'test@example.com',
};

export class RecoveryPasswordDto {
  @ApiProperty({
    description: 'Email user',
    example: recoveryPasswordDtoExample.email,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
