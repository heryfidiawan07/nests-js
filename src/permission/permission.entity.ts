import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from "../role/role.entity";
import { Menu } from "../menu/menu.entity";
import { Action } from "../action/action.entity";

@Entity('permission')
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	// @ManyToOne(() => Role, role => role.permissions)
	// role: Role;

	// @ManyToOne(() => Menu, menu => menu.permissions)
	// menu: Menu;

	// @ManyToOne(() => Action, action => action.permissions)
	// action: Action;

	@Column()
	roleId: string;

	@Column()
	menuId: string;

	@Column()
	actionId: string;

	@Column()
	action: string;
}
