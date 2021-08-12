import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {

	constructor(
		@InjectRepository(Permission) private readonly model: Repository<Permission>,
	) {}

	async all(): Promise<Permission[]> {
		return this.model.find();
	}

	async first(id: string): Promise<Permission> {
	    return this.model.findOne(id);
	}

	async whereFirst(data: Object): Promise<Permission> {
	    return this.model.findOne({ where: data });
	}

	async where(data: Object): Promise<Permission[]> {
	    return this.model.find({ where: data });
	}
}
