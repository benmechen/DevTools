import { Module } from '@nestjs/common';
import { HelperService } from './helper/helper.service';
import { HashService } from './hash/hash.service';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token/token.entity';
import { ConfigService } from '@nestjs/config';
import { AWSHelperService } from './aws.service';

export const SecretsFactory = {
	provide: 'SECRETS',
	useFactory: async (
		awsHelperService: AWSHelperService,
		configService: ConfigService,
	) => {
		return {
			private: await awsHelperService.getSecret(
				configService.get('AWS_PRIVATE_KEY_NAME') ?? '',
			),
			public: await awsHelperService.getSecret(
				configService.get('AWS_PUBLIC_KEY_NAME') ?? '',
			),
		};
	},
	inject: [AWSHelperService, ConfigService],
};

@Module({
	imports: [
		JwtModule.register({
			verifyOptions: {
				ignoreExpiration: false,
			},
		}),
		TypeOrmModule.forFeature([Token]),
	],
	providers: [
		HelperService,
		HashService,
		TokenService,
		AWSHelperService,
		SecretsFactory,
	],
	exports: [HelperService, HashService, TokenService],
})
export class CommonModule {}
