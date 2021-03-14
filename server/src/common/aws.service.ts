import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSHelperService {
	private client: AWS.SecretsManager;

	constructor() {
		this.client = new AWS.SecretsManager({
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_SECRET_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_SECRET_ACCESS_KEY,
		});
	}

	getSecret(secretName: string) {
		return new Promise((resolve, reject) => {
			this.client.getSecretValue(
				{ SecretId: secretName },
				(err, data) => {
					if (err) {
						throw err;
					} else {
						if ('SecretString' in data) {
							resolve(data.SecretString);
						}
						reject();
					}
				},
			);
		});
	}
}
