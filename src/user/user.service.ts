import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private readonly model: Repository<User>,
	) {}

	async all(): Promise<User[]> {
		return this.model.find({ relations: ['roles'] });
	}

	async first(id: string): Promise<User> {
	    return this.model.findOne(id, { relations: ['roles'] });
	}

	async whereFirst(data: Object): Promise<User> {
	    return this.model.findOne({ where: data });
	}

	async where(data: Object): Promise<User[]> {
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
