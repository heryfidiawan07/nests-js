import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from './roleUser.entity';

@Injectable()
export class RoleUserService {

	constructor(
		@InjectRepository(RoleUser) private readonly model: Repository<RoleUser>
	) {}

	async delete(fk: string): Promise<void> {
		await this.model.delete(fk);
	}

	async post(body: Object): Promise<void> {
		await this.model.save(body);
	}

	async whereFirst(data: Object): Promise<RoleUser> {
	    return this.model.findOne({ where: data });
	}

	async where(data: Object): Promise<RoleUser[]> {
	    return this.model.find({ where: data });
	}

}
