import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashService } from '../common/hash/hash.service';
import { Token } from '../common/token/token.entity';
import { TokenService } from '../common/token/token.service';
import { User } from '../user/entities/user.entity';
import { UserNotFoundException } from '../user/user-not-found.exception';
import { UserService } from '../user/user.service';

type AuthTokenPayload = {
	sub: string;
	email: string;
};

@Injectable()
export class AuthService {
	private accessTokenLifetime = '1 year';

	constructor(
		private userService: UserService,
		private hashService: HashService,
		private tokenService: TokenService,
		private configService: ConfigService,
	) {
		this.accessTokenLifetime =
			this.configService.get('ACCESS_TOKEN_LIFETIME') ??
			this.accessTokenLifetime;
	}

	/**
	 * Make sure the user exists, and they have the required permissions
	 * @param id ID of the user to verify
	 */
	async validateUser(id: string): Promise<User | null> {
		const user = await this.userService.findByID(id);

		return user;
	}

	/**
	 * Check if a given password matches a user's password
	 * @param email User's email
	 * @param password Inputted password
	 * @returns User
	 */
	async verifyPassword(email: string, password: string): Promise<User> {
		const user = await this.userService.findByEmailOrFail(email);

		const doMatch = await this.hashService.compare(password, user.password);
		if (!doMatch) throw new UserNotFoundException();

		return user;
	}

	/**
	 * Create an access token for a user
	 * @param user User to grant access, or an object containing the user's ID and email
	 */
	async createAccessToken(user: User): Promise<string> {
		const payload: AuthTokenPayload = {
			sub: user.id,
			email: user.email,
		};

		return this.tokenService.sign(payload, this.accessTokenLifetime);
	}

	/**
	 * Save a refresh token to the user's whitelist
	 * @param user User logging in
	 * @param token Refresh token to save
	 */
	async saveToken(user: User, token: string) {
		const issuedToken = Token.of({
			token,
			user,
		});
		return this.tokenService.save(issuedToken);
	}

	/**
	 * Revoke a token from the list of issued tokens
	 * @param token JWT token to revoke
	 */
	async revokeToken(token: string) {
		this.tokenService.delete(token);
	}
}
