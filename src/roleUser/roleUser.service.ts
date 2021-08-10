import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from './roleUser.entity';

@Injectable()
export class RoleUserService {

	constructor(
		@InjectRepository(RoleUser) private readonly roleUser: Repository<RoleUser>
	) {}

	async delete(fk: string): Promise<void> {
		await this.roleUser.delete(fk);
	}

	async post(body: Object): Promise<void> {
		await this.roleUser.save(body);
	}

}
