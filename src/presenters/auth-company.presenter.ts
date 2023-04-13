import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensEntity } from '../entities';

const authTokensPresenterExample: AuthTokensCompanyPresenter = {
  token: 'token',
  refreshToken: 'refreshToken',
};

export class AuthTokensCompanyPresenter {
  @ApiProperty({
    description: 'Token.',
    example: authTokensPresenterExample.token,
  })
  token: string;

  @ApiProperty({
    description: 'Refresh token.',
    example: authTokensPresenterExample.refreshToken,
  })
  refreshToken: string;

  constructor(tokens: AuthTokensEntity) {
    this.token = tokens.token;
    this.refreshToken = tokens.refreshToken;
  }
}
