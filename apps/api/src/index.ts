import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.NEXTJS_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`API server running on port ${port}`);
}

bootstrap();
