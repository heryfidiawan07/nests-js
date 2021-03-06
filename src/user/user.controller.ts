import { Controller, UsePipes, ValidationPipe, Param, Body, Get, Post, Put, Patch, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { RoleUserService } from '../roleUser/roleUser.service'
import { UserRequest } from './user.dto'
import { v4 as uuidv4 } from 'uuid'
const bcrypt = require('bcrypt')


@Controller('user')
export class UserController {

	constructor(
		private user: UserService,
		private roleUser: RoleUserService
	) {}

	@Get()
	async index() {
		try{
			return {status: true, data: await this.user.all(), message: true}
		}catch(error) {
			return {status: false, data: null, message: error.detail}
		}
	}

	@Get(':id')
	async show(@Param('id') id: string) {
		// console.log('Controller show :id',id)
		try{
			return {status: true, data: await this.user.first(id), message: true}
		}catch(error) {
			return {status: false, data: null, message: error.detail}
		}
	}

	@Delete(':id')
	async destory(@Param('id') id: string) {
		// console.log('Controller destroy :id',id)
		try{
			await this.user.delete(id)
			await this.roleUser.delete(id)
			return {status: true, data: true, message: 'Delete success'}
		}catch(error) {
			return {status: false, data: null, message: error.detail}
		}
	}
	

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async post(@Body() valid: UserRequest) {
		const uuid = uuidv4()
		valid['id'] = uuid
		let roles = []
		await valid['roles'].map(roleId => {
			roles.push({
				user_id: uuid,
				role_id: roleId
			})
		})
		delete valid['roles']

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(valid['password'], salt)
		// const hash = await bcrypt.hash(valid['password'], 10)
		valid['password'] = hash

		try{
			// console.log('Controller valid',valid)
			await this.user.post(valid)
			await this.roleUser.post(roles)

			return {status: true, data: valid, message: true}
		}catch(error) {
			return {status: false, data: valid, message: error.detail}
		}
	}

	@Put(':id')
	async put(@Param('id') id: string, @Body() valid: UserRequest) {
		// console.log('Controller put :id',id)
		valid['id'] = id
		let roles = []
		await valid['roles'].map(roleId => {
			roles.push({
				user_id: id,
				role_id: roleId
			})
		})
		delete valid['roles']

		try{
			// console.log('Controller valid',valid)
			await this.user.put(valid)
			await this.roleUser.delete(id)
			await this.roleUser.post(roles)

			return {status: true, data: valid, message: true}
		}catch(error) {
			return {status: false, data: valid, message: error.detail}
		}
	}
}