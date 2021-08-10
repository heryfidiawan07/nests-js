import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from "../role/role.entity";

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({
	    type: "varchar",
	    length: 100,
	    unique: true,
	})
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;

	@ManyToMany(type => Role, role => role.users)
	@JoinTable({
    	name: 'role_user',
	    joinColumn: {
	      name: 'user_id',
	      referencedColumnName: 'id',
	    },
	    inverseJoinColumn: {
	      name: 'role_id',
	      referencedColumnName: 'id',
	    },
	})
  	roles: Role[]
}
