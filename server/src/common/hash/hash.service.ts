import { Inject, Injectable, Optional } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
	constructor(@Inject('ROUNDS') @Optional() private rounds = 12) {}

	/**
	 * Hash data using hashing algorithm
	 * @param data Data to be hashed
	 * @param saltOrRounds (Optional) Salt or rounds. Defaults to `HashService` default.
	 * @returns Hashed string
	 */
	async hash(data: any, saltOrRounds?: string | number): Promise<string> {
		return hash(data, saltOrRounds ?? this.rounds);
	}

	/**
	 * Compare a hashed string with data
	 * @param data Unencrypted data
	 * @param encrypted Hashed string
	 * @returns Predicate value if matches
	 */
	async compare(data: any, encrypted: string): Promise<boolean> {
		return compare(data, encrypted);
	}
}
