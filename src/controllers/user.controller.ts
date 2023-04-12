import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { CreateUserDto } from '../dtos';
import { UserPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'users' })
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<string> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok.',
    type: UserPresenter,
  })
  async getUserById(@Param('id') id: string): Promise<UserPresenter> {
    const user = await this.userService.getUserById(id);
    return new UserPresenter(user);
  }
}
