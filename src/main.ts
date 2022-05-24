import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5001;
  const SUCCESS_SERVER_STARTED_MSG = `Server started on port: ${PORT}`;

  const VERSION = '1.0.0';
  const config = new DocumentBuilder()
    .setTitle('Etherscan saver')
    .setDescription('Etherscan saver REST API')
    .setVersion(VERSION)
    .addTag('Etherscan')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/docs/v/${VERSION}`, app, document);

  await app.listen(PORT, () => {
    console.log(SUCCESS_SERVER_STARTED_MSG);
  });
}
bootstrap();
