// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { run } from './utils/seeds/index';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.RUN_SEEDS === 'true') {
    await run();
  }

  await app.listen(3000);
}

bootstrap();
