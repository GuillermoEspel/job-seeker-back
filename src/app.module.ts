import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './config/environment-config.module';
import { AppController } from './controllers';
import { AppService } from './services';

@Module({
  imports: [EnvironmentConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
