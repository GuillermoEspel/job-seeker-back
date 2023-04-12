import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './config';

async function bootstrap() {
  // Create application
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvironmentConfigService);
  const { port } = configService.getAppConfig();

  // Start application
  await app.listen(port, () => {
    Logger.log(`Listening in port ${port}.`);
  });
}
bootstrap();
