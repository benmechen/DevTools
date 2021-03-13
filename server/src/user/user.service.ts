import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../common/hash/hash.service';
import { HelperService } from '../common/helper/helper.service';
import { InvalidIDException } from '../common/invalidID.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private hashService: HashService,
		private helperService: HelperService,
	) {}

	/**
	 * Find all users
	 * @returns List of users
	 */
	findAll() {
		return this.userRepository.find();
	}

	/**
	 * Find one user by their ID
	 * @param id User ID
	 * @returns User (if found)
	 */
	findByID(id: string) {
		if (!this.helperService.isValidID(id)) throw new InvalidIDException();

		return this.userRepository.findOne({
			id,
		});
	}

	/**
	 * Find a user by their ID, throwing exception if not found
	 * @param id User ID
	 * @throws `NotFoundException` if user is not found
	 * @returns User
	 */
	async findByIDOrFail(id: string): Promise<User> {
		const user = await this.findByID(id);
		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	/**
	 * Find a user by their email
	 * @param email User email
	 * @returns User (if found)
	 */
	findByEmail(email: string) {
		return this.userRepository.findOne({
			email,
		});
	}

	/**
	 * Create a new user and return the user object
	 * @param createUserDto User input
	 * @returns New user
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create({
			...createUserDto,
			password: await this.hashService.hash(createUserDto.password),
		});

		return this.userRepository.save(user);
	}

	/**
	 * Update a user's details
	 * @param id User ID
	 * @param updateUserDto Details to set
	 * @returns Updated user
	 */
	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findByIDOrFail(id);

		return this.userRepository.save({
			...user,
			...updateUserDto,
			password: updateUserDto.password
				? await this.hashService.hash(updateUserDto.password)
				: user.password,
		});
	}

	/**
	 * Delete a user
	 * @param id User ID
	 * @returns Deleted user
	 */
	async remove(id: string): Promise<User> {
		const user = await this.findByIDOrFail(id);

		return this.userRepository.remove(user);
	}
}
