import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_roles_role')
export class RoleUser {
	@PrimaryColumn()
	userId: string;

	@Column()
	roleId: string;
}
