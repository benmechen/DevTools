import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { Node } from '../../common/base.entity';
import { Token } from '../../common/token/token.entity';

@Entity('users')
export class User extends Node {
	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@OneToMany(() => Token, (token) => token.user, {
		cascade: true,
	})
	@Exclude()
	issuedTokens: Token[];
}
