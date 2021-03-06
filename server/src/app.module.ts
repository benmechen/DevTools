import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
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
		CommonModule,
		UserModule,
		AuthModule,
		ProjectModule,
		EnvironmentModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
