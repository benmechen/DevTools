import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserNotFoundException } from '../user/user-not-found.exception';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() { email, password }: LoginDTO) {
		// Check if passwords match
		const user = await this.authService.verifyPassword(email, password);

		// Generate access token
		const accessToken = await this.authService.createAccessToken(user);

		// Whitelist token
		// await this.authService.saveToken(user, accessToken);

		return { accessToken };
	}
}
