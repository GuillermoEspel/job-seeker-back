import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthCompanyService } from '../services';
import {
  LoginCompanyDto,
  RecoveryPasswordCompanyDto,
  RefreshTokenCompanyDto,
  ResetPasswordCompanyDto,
} from '../dtos';
import { AuthTokensCompanyPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'auth-company' })
@ApiTags('Authentication for companies')
export class AuthCompanyController {
  constructor(private readonly authService: AuthCompanyService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Ok.',
    type: AuthTokensCompanyPresenter,
  })
  async createUser(
    @Body() body: LoginCompanyDto,
  ): Promise<AuthTokensCompanyPresenter> {
    const tokens = await this.authService.login(body);
    return new AuthTokensCompanyPresenter(tokens);
  }

  @Post('refresh-token')
  @ApiOkResponse({
    description: 'Ok.',
    type: AuthTokensCompanyPresenter,
  })
  async refreshToken(
    @Body() body: RefreshTokenCompanyDto,
  ): Promise<AuthTokensCompanyPresenter> {
    const tokens = await this.authService.refreshToken(body);
    return new AuthTokensCompanyPresenter(tokens);
  }

  @Post('recovery-password')
  recoveryPassword(@Body() body: RecoveryPasswordCompanyDto): Promise<void> {
    return this.authService.recoveryPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordCompanyDto): Promise<void> {
    return this.authService.resetPassword(body);
  }
}
