import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {

	constructor(
		@InjectRepository(Menu) private readonly model: Repository<Menu>,
	) {}

	async all(): Promise<Menu[]> {
		return this.model.find();
	}

	async first(id: string): Promise<Menu> {
	    return this.model.findOne(id);
	}

	async whereFirst(data: Object): Promise<Menu> {
	    return this.model.findOne({ 
	    	relations: ['parent'],
	    	where: data 
	    });
	}

	async where(data: Object): Promise<Menu[]> {
	    return this.model.find({
	    	relations: ['parent'],
	    	where: data 
	    });
	}
}
