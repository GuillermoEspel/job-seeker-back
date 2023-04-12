import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { CreateUserDto } from '../dtos';

@Controller({ version: 'v1', path: 'users' })
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<string> {
    return this.userService.createUser(body);
  }
}
