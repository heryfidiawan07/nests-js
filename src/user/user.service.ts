import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private readonly user: Repository<User>,
	) {}

	async all(): Promise<User[]> {
		return this.user.find({ relations: ['roles'] });
	}

	async first(id: string): Promise<User> {
	    return this.user.findOne(id, { relations: ['roles'] });
	}

	async where(data: Object): Promise<User> {
	    return this.user.findOne({ where: data });
	}

	async delete(id: string): Promise<void> {
		await this.user.delete(id);
	}

	async post(body: Object): Promise<void> {
		await this.user.save(body);
	}

	async put(body: Object): Promise<void> {
		const id = body['id']
		delete body['id']
		await this.user.update(id, body);
	}
}
