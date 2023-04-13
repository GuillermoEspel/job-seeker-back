import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const loginDtoExample: LoginDto = {
  email: 'test@example.com',
  password: 'pass1234',
};

export class LoginDto {
  @ApiProperty({
    description: 'Email user',
    example: loginDtoExample.email,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password user',
    example: loginDtoExample.password,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
