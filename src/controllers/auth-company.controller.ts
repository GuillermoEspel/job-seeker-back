import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  recoveryPassword(@Body() body: RecoveryPasswordCompanyDto): Promise<void> {
    return this.authService.recoveryPassword(body);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() body: ResetPasswordCompanyDto): Promise<void> {
    return this.authService.resetPassword(body);
  }
}
