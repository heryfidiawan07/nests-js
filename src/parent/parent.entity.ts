import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Menu } from "../menu/menu.entity";

@Entity('parents')
export class Parent {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	icon: string;

  	// @OneToMany(() => Menu)
   //  @JoinColumn({name: 'menu_id', referencedColumnName: 'id',})
   //  menus: Menu;

	@OneToMany(type => Menu, menu => menu.parent)
	@JoinColumn({name: 'parent_id', referencedColumnName: 'id',})
	menus: Menu[];
}
