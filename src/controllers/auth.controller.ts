import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Ok.',
    type: AuthTokensPresenter,
  })
  async createUser(@Body() body: LoginDto): Promise<AuthTokensPresenter> {
    const tokens = await this.authService.login(body);
    return new AuthTokensPresenter(tokens);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  recoveryPassword(@Body() body: RecoveryPasswordDto): Promise<void> {
    return this.authService.recoveryPassword(body);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(body);
  }
}
