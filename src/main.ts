import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandler } from './config/error-handling';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './pipe/validation.pipe';
// import { registerSchema } from 'class-validator';
// import { EnvValidationSchema } from './config/env';
// import './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// registerSchema(EnvValidationSchema);
	app.useGlobalPipes(new ValidationPipe());
	// app.useGlobalFilters(new ErrorHandler());
	await app.listen(process.env.APP_PORT, () => {
		console.log('Server listening at port 3000');
		console.log(`Server started at: http://localhost:3000/api`);
	});
}
bootstrap();
