import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { CreateUserDto } from '../dtos';
import { UserRepository } from '../repositories';
import { CreateUserException, GetUserByIdException } from '../exceptions';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<string> {
    try {
      const { email, password } = dto;
      const user = await this.userRepository.getByEmail(email);
      if (user) throw new Error('User already exists.');
      // TODO: hash password
      const newUserId = await this.userRepository.create(dto);
      return newUserId;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateUserException();
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) throw new Error('User not found.');
      return user;
    } catch (error) {
      Logger.error(error.message);
      throw new GetUserByIdException();
    }
  }
}
