import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Role } from "../role/role.entity"

@Entity('user')
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({
	    type: "varchar",
	    length: 100,
	    unique: true,
	})
	email: string;

	@Column("varchar", { length: 200 })
	password: string;

	@CreateDateColumn()
	created_at: string;

	@UpdateDateColumn()
	updated_at: string;

	@ManyToMany(() => Role, {
        eager: true
    })
    @JoinTable()
    roles: Role[];
}
