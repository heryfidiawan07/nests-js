import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './parent.entity';

@Injectable()
export class ParentService {

	constructor(
		@InjectRepository(Parent) private readonly model: Repository<Parent>,
	) {}

	async all(): Promise<Parent[]> {
		return this.model.find({ relations: ['menus'] });
	}

	async first(id: string): Promise<Parent> {
	    return this.model.findOne(id, { relations: ['menus'] });
	}

	async whereFirst(data: Object): Promise<Parent> {
	    return this.model.findOne({
	    	where: data,
	    	relations: ['menus'],
	    });
	}

	async where(data: Object): Promise<Parent[]> {
	    return this.model.find({ 
	    	where: data,
	    	relations: ['menus'],
	    });
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
