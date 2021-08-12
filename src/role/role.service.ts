import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

	constructor(
		@InjectRepository(Role) private readonly model: Repository<Role>,
	) {}

	async all(): Promise<Role[]> {
		return this.model.find({ relations: ['roles'] });
	}

	async first(id: string): Promise<Role> {
	    return this.model.findOne(id, { relations: ['roles'] });
	}

	async whereFirst(data: Object): Promise<Role> {
	    return this.model.findOne({ where: data });
	}

	async where(data: Object): Promise<Role[]> {
	    return this.model.find({ where: data });
	}

	async delete(id: string): Promise<void> {
		await this.model.delete(id);
	}

	async post(body: Object): Promise<void> {
		await this.model.save(body);
	}

	async put(body: Object): Promise<void> {
		const id = body['id']
		delete body['id']
		await this.model.update(id, body);
	}
}
