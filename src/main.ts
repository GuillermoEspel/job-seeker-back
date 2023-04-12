import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './config';
import { DtoException } from './exceptions';
import { AllExceptionFilter } from './filters';

async function bootstrap() {
  // Create application
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvironmentConfigService);
  const { basePath, port, version } = configService.getAppConfig();
  app.setGlobalPrefix(version);

  // Filters
  app.useGlobalFilters(new AllExceptionFilter());

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const details = errors.flatMap((err) =>
          !!err.constraints
            ? Object.values(err.constraints)
            : err.children.flatMap((item) => Object.values(item.constraints)),
        );
        throw new DtoException(details);
      },
    }),
  );

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
