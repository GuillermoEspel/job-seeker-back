import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
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
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password user',
    example: loginDtoExample.password,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
