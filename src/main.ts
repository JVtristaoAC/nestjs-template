import { NestFactory } from '@nestjs/core';
import { environmentConfig, swaggerConfig } from '@shared/config';
import helmet from 'helmet';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = environmentConfig();

  app.use(helmet());
  swaggerConfig(app);

  await app.listen(port);
}

bootstrap();
