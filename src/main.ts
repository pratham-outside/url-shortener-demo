import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandler } from './config/error-handling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(process.env.APP_PORT, () => {
    console.log('Server listening at port 3000');
    console.log(`Server started at: http://localhost:3000/v1/api/`);
  });
}
bootstrap();
