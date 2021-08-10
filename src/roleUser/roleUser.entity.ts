import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('role_user')
export class RoleUser {
	@PrimaryColumn()
	user_id: string;

	@Column()
	role_id: string;
}
