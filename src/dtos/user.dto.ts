import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const createUserDtoExample: CreateUserDto = {
  email: 'test@example.com',
  password: 'pass1234',
};

export class CreateUserDto {
  @ApiProperty({
    description: 'Email user',
    example: createUserDtoExample.email,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password user',
    example: createUserDtoExample.password,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
