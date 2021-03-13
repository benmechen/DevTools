import { IsAlpha, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsAlpha()
	firstName: string;

	@IsAlpha()
	lastName: string;

	@IsEmail()
	email: string;

	@MinLength(8)
	password: string;
}
