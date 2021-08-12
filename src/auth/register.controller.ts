import { Controller, UsePipes, ValidationPipe, Body, Post } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RegisterRequest } from './register.dto'
import { v4 as uuidv4 } from 'uuid'

const bcrypt = require('bcrypt')


@Controller('auth/register')
export class RegisterController {

	constructor(
		private user: UserService,
	) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async post(@Body() valid: RegisterRequest) {
		const user = await this.user.whereFirst({'email': valid['email']})
		// console.log('user',user)
		// console.log('valid',valid)
		if(user) {
			return {status: false, result: false, message: 'Sorry, email already registered !'}
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(valid['password'], salt)
		valid['password'] = hash
		valid['id'] = uuidv4()

		try{
			await this.user.post(valid)
			return {
				status: true, 
				result: valid,
				message: 'Data successfully registered'
			}
		}catch(error) {
			return {status: false, result: valid, message: error.detail}
		}
	}
}