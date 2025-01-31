import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from '@project/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3000;
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('The API Gateway')
    .setDescription('The API Gateway API for frontend')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  // const port = process.env.PORT || DEFAULT_PORT;
  const port = DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
