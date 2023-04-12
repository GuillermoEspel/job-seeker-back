import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './config';

async function bootstrap() {
  // Create application
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvironmentConfigService);
  const { basePath, port, version } = configService.getAppConfig();
  app.setGlobalPrefix(version);

  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Job seeker')
    .setDescription('Job seeker documentation.')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  const swaggerPath = `${version}/swagger`;
  SwaggerModule.setup(swaggerPath, app, document);

  // Start application
  await app.listen(port, () => {
    Logger.log(`Listening in port ${port}.`);
    Logger.log(`Swagger: ${basePath}/${swaggerPath}`);
  });
}
bootstrap();
