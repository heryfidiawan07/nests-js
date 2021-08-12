import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinTable } from 'typeorm';
import { Role } from "../role/role.entity";

@Entity('permissions')
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column()
	role_id: string;

	@Column()
	menu_id: string;

	@Column()
	action_id: string;

	@Column()
	action: string;
}
