import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

	constructor(
		@InjectRepository(Role) private readonly role: Repository<Role>,
	) {}

	async all(): Promise<Role[]> {
		return this.role.find({ relations: ['roles'] });
	}

	async first(id: string): Promise<Role> {
	    return this.role.findOne(id, { relations: ['roles'] });
	}

	async delete(id: string): Promise<void> {
		await this.role.delete(id);
	}

	async post(body: Object): Promise<void> {
		await this.role.save(body);
	}

	async put(body: Object): Promise<void> {
		const id = body['id']
		delete body['id']
		await this.role.update(id, body);
	}
}
