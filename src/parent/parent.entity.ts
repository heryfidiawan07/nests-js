import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Menu } from "../menu/menu.entity";

@Entity('parent')
export class Parent {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	icon: string;

	@OneToMany(() => Menu, menu => menu.parent)
    menus: Menu[];
}
