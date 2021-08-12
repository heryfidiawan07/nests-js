import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Parent } from "../parent/parent.entity";
import { Action } from "../action/action.entity";

@Entity('menus')
export class Menu {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	parent_id: string;

	@Column()
	sidebarUrl: string;

	@Column()
	icon: string;

	@Column()
	route: string;

	@OneToOne(() => Parent)
    @JoinColumn({name: 'parent_id', referencedColumnName: 'id',})
    parent: Parent;

	@OneToMany(type => Action, action => action)
	@JoinColumn({name: 'menu_id', referencedColumnName: 'id',})
  	actions: Action[];
}
