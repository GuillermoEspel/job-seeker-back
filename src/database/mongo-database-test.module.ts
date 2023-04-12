import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        return { uri };
      },
    }),
  ],
})
export class MongoDatabaseTestModule {}

export const closeDatabaseConnection = async () => {
  if (mongod) await mongod.stop();
};
