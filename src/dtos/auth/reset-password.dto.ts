import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const resetPasswordDtoExample: ResetPasswordDto = {
  email: 'test@example.com',
  newPassword: 'password123',
};

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email user',
    example: resetPasswordDtoExample.email,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'New password',
    example: resetPasswordDtoExample.newPassword,
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
