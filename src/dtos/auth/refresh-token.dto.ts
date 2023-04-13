import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const refreshTokenDtoExample: RefreshTokenDto = {
  refreshToken: 'token',
};

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: refreshTokenDtoExample.refreshToken,
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
