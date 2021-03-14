import { Inject, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
	public publicKey: string;

	private privateKey: string;

	public options: JwtVerifyOptions = {
		issuer: 'tokens.devtools.com',
		algorithms: ['RS256'],
	};

	constructor(
		@InjectRepository(Token) private tokenRepository: Repository<Token>,
		private jwtService: JwtService,
		@Inject('SECRETS')
		secrets: { public: string; private: string },
	) {
		if (!secrets.public || secrets.public.trim().length === 0)
			throw new Error('No public key given');
		if (!secrets.private || secrets.private.trim().length === 0)
			throw new Error('No private key given');

		this.publicKey = secrets.public;
		this.privateKey = secrets.private;
	}

	/**
	 * Sign a JWT token using system public/private key pair, with algorithm and issuer checks
	 * @param payload Data to store in JWT
	 * @param expiry Expiration time in zeit/ms
	 * @returns JWT string
	 */
	sign(
		payload: string | Record<string, unknown> | Buffer,
		expiry: string,
	): string {
		const token = this.jwtService.sign(payload, {
			issuer: this.options.issuer as string,
			algorithm: this.options.algorithms?.[0] ?? 'HS256',
			privateKey: this.privateKey,
			expiresIn: expiry,
		});
		return token;
	}

	/**
	 * Verify a token is valid, and decode its contents
	 * @param token JWT token to decode
	 * @returns Payload if valid, otherwise null
	 */
	verify(token: string) {
		try {
			return this.jwtService.verify(token, {
				...this.options,
				publicKey: this.publicKey,
			});
		} catch {
			return null;
		}
	}

	/**
	 * Save a new token in the database
	 * @param token Token
	 */
	async save(token: Token): Promise<Token> {
		return this.tokenRepository.save(token);
	}

	/**
	 * Remove and thus invalidate all tokens issued to a user
	 * @param userID ID of user to delete tokens for
	 */
	async deleteAll(userId: string) {
		return this.tokenRepository
			.createQueryBuilder('tokens')
			.delete()
			.where('tokens."userId" = :userId', { userId })
			.execute();
	}

	/**
	 * Delete a token from the issued tokens table
	 * @param token Token to query by
	 */
	async delete(token: string) {
		this.tokenRepository.delete({
			token,
		});
	}
}
