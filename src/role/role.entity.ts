import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from "../user/user.entity";

@Entity('roles')
export class Role {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
	    type: "varchar",
	    length: 100,
	    unique: true,
	})
	name: string;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;

	@ManyToMany(type => User, user => user.roles)
	@JoinTable({
    	name: 'role_user',
	    joinColumn: {
	      name: 'role_id',
	      referencedColumnName: 'id',
	    },
	    inverseJoinColumn: {
	      name: 'user_id',
	      referencedColumnName: 'id',
	    },
	})
  	users: User[]
}
