import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const refreshTokenDtoExample: RefreshTokenCompanyDto = {
  refreshToken: 'token',
};

export class RefreshTokenCompanyDto {
  @ApiProperty({
    description: 'Refresh token',
    example: refreshTokenDtoExample.refreshToken,
  })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
