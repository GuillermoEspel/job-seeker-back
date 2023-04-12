import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserRepository } from '../repositories';

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
      throw new Error(error.message); // TODO: Generate exception
    }
  }
}
