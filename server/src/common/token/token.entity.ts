import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Node } from '../base.entity';

@Entity('tokens')
export class Token extends Node {
	@Column()
	token: string;

	@ManyToOne(() => User, (user) => user.issuedTokens, {
		onDelete: 'CASCADE',
	})
	user: User;
}
