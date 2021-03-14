import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserNotFoundException } from '../user/user-not-found.exception';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	@Post('login')
	async login(@Body() { email, password }: LoginDTO) {
		// Find the user
		const user = await this.userService.findByEmailOrFail(email);

		// Check if passwords match
		const doPasswordsMatch = await this.authService.verifyPassword(
			user,
			password,
		);
		if (!doPasswordsMatch) throw new UserNotFoundException();

		// Generate access token
		const accessToken = await this.authService.createAccessToken(user);

		// Whitelist token
		await this.authService.saveToken(user, accessToken);

		return { accessToken };
	}
}
