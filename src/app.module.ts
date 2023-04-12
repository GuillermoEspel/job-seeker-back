import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './config/environment-config.module';
import { HealthController, UserController } from './controllers';
import { MongoDatabaseModule } from './database';
import { RepositoriesModule } from './repositories';
import { HealthService, UserService } from './services';

@Module({
  imports: [EnvironmentConfigModule, MongoDatabaseModule, RepositoriesModule],
  controllers: [HealthController, UserController],
  providers: [HealthService, UserService],
})
export class AppModule {}
