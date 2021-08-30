import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Parent } from "../parent/parent.entity";
import { Action } from "../action/action.entity";

@Entity('menu')
export class Menu {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	sidebarUrl: string;

	@Column()
	icon: string;

	@Column()
	route: string;

	@Column()
	parentId: string;

  	@ManyToOne(() => Parent, parent => parent.menus)
    parent: Parent;

    @OneToMany(() => Action, action => action.menu)
    actions: Action[];
}
