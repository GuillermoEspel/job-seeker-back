import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { User } from '../database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    const document = new UserEntity();
    document.email = dto.email;
    document.password = dto.password;
    const item = await this.userModel.create(document);
    return item._id.toString();
  }

  async getById(id: string): Promise<UserEntity> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');
    const item = await this.userModel.findById(id);
    if (!item) return null;
    return this.toUserEntity(item);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const item = await this.userModel.findOne({ email });
    if (!item) return null;
    return this.toUserEntity(item);
  }

  async getAll(): Promise<UserEntity[]> {
    const items = await this.userModel.find();
    return items.map((item) => this.toUserEntity(item));
  }

  async updateById(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user._id.toString();
    userEntity.email = user.email;
    userEntity.password = user.password;
    return userEntity;
  }
}
