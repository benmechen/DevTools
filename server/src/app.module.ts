import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) =>
				dbConfig(configService, {
					dbName: 'DB_NAME',
					name: 'default',
					synchronize: true,
					cache: true,
				}),
			inject: [ConfigService],
		}),
		UserModule,
		CommonModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
