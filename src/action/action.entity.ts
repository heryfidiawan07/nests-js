import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Menu } from "../menu/menu.entity";

@Entity('action')
export class Action {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	alias: string;

	@ManyToOne(() => Menu, menu => menu.actions)
    menu: Menu;
}
