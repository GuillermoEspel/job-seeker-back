import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../database';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
