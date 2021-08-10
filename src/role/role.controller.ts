import { Controller, UsePipes, ValidationPipe, Param, Body, Get, Post, Put, Patch, Delete } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleUserService } from '../roleUser/roleUser.service'
import { Role } from './role.entity'
import { RoleRequest } from './role.dto'
import { v4 as uuidv4 } from 'uuid'


@Controller('role')
export class RoleController {

	constructor(
		private role: RoleService,
		private roleUser: RoleUserService
	) {}

	@Get()
	async index() {
		try{
			return {status: true, result: await this.role.all(), message: true}
		}catch(error) {
			return {status: false, result: false, message: error.detail}
		}
	}

	@Get(':id')
	async show(@Param('id') id: string) {
		// console.log('Controller show :id',id)
		try{
			return {status: true, result: await this.role.first(id), message: true}
		}catch(error) {
			return {status: false, result: false, message: error.detail}
		}
	}

	@Delete(':id')
	async destory(@Param('id') id: string) {
		// console.log('Controller destroy :id',id)
		try{
			await this.role.delete(id)
			await this.roleUser.delete(id)
			return {status: true, result: true, message: 'Delete success'}
		}catch(error) {
			return {status: false, result: false, message: error.detail}
		}
	}
	

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async post(@Body() valid: RoleRequest) {
		valid['id'] = uuidv4()

		try{
			// console.log('Controller valid',valid)
			await this.role.post(valid)

			return {status: true, result: valid, message: true}
		}catch(error) {
			return {status: false, result: valid, message: error.detail}
		}
	}

	@Put(':id')
	async put(@Param('id') id: string, @Body() valid: RoleRequest) {
		// console.log('Controller put :id',id)
		valid['id'] = id

		try{
			// console.log('Controller valid',valid)
			await this.role.put(valid)

			return {status: true, result: valid, message: true}
		}catch(error) {
			return {status: false, result: valid, message: error.detail}
		}
	}
}