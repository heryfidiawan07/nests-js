import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('actions')
export class Action {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	menu_id: string;

	@Column()
	name: string;

	@Column()
	alias: string;
}
