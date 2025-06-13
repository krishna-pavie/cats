import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3007', 'http://localhost:8087'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.setGlobalPrefix('api/v1');

  const port = process.env.APP_PORT || 3007;  // <-- Lee del .env
  await app.listen(port);

  console.log(`Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
