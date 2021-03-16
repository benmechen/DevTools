import { Column } from 'typeorm';
import { Node } from '../../common/base.entity';

export class Project extends Node {
	@Column()
	name: string;
}
