import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	// Use class validator
	app.useGlobalPipes(new ValidationPipe());

	const port = configService.get('PORT') ?? 4000;
	await app.listen(port);
	// eslint-disable-next-line
	console.log('🚀 Server ready on port 4000');
}
bootstrap();
