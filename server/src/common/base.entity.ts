import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class Node {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	created: Date = new Date();

	@UpdateDateColumn()
	updated: Date = new Date();

	/**
	 * Create a new entity
	 * @param params entity input
	 */
	public static of<T extends Node>(this: new () => T, params: Partial<T>): T {
		const entity = new this();

		Object.assign(entity, params);

		return entity;
	}
}
