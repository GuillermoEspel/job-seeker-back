import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './config/environment-config.module';
import { HealthController } from './controllers';
import { HealthService } from './services';

@Module({
  imports: [EnvironmentConfigModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
