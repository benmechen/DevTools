import { IsEmail } from 'class-validator';

export class LoginDTO {
	@IsEmail()
	email: string;

	password: string;
}
