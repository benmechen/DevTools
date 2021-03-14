import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	BadRequestException,
	UseGuards,
	ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authentication } from '../auth/auth.guard';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseGuards(Authentication)
	async create(@Body() createUserDto: CreateUserDto) {
		const existingUser = await this.userService.findByEmail(
			createUserDto.email,
		);
		if (existingUser)
			throw new BadRequestException(
				'A user with that email already exists',
			);

		return this.userService.create(createUserDto);
	}

	@Get()
	@UseGuards(Authentication)
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@UseGuards(Authentication)
	findOne(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.userService.findByID(id);
	}

	@Patch(':id')
	@UseGuards(Authentication)
	update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(Authentication)
	remove(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.userService.remove(id);
	}
}
