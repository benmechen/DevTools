import { Injectable } from '@nestjs/common';
import { ObjectID } from 'typeorm';

@Injectable()
export class HelperService {
	/**
	 * Check if ID is a valid UUID
	 * @param id ID to check
	 * @returns A boolean value indicating if the ID is a valid UUID
	 */
	isValidID(id?: string | number | Date | ObjectID): boolean {
		return !!id
			?.toString()
			.match(/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i);
	}
}
