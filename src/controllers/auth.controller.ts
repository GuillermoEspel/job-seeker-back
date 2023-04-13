import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services';
import {
  LoginDto,
  RecoveryPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../dtos';
import { AuthTokensPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'auth' })
@ApiTags('Authentication for applicants')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Ok.',
    type: AuthTokensPresenter,
  })
  async createUser(@Body() body: LoginDto): Promise<AuthTokensPresenter> {
    const tokens = await this.authService.login(body);
    return new AuthTokensPresenter(tokens);
  }

  @Post('refresh-token')
  @ApiOkResponse({
    description: 'Ok.',
    type: AuthTokensPresenter,
  })
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<AuthTokensPresenter> {
    const tokens = await this.authService.refreshToken(body);
    return new AuthTokensPresenter(tokens);
  }

  @Post('recovery-password')
  recoveryPassword(@Body() body: RecoveryPasswordDto): Promise<void> {
    return this.authService.recoveryPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(body);
  }
}
