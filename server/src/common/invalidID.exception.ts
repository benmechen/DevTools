import { NotFoundException } from '@nestjs/common';

export class InvalidIDException extends NotFoundException {
	constructor() {
		super('Invalid ID');
	}
}
