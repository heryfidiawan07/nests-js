import { Controller, UsePipes, ValidationPipe, Body, Post } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginRequest } from './login.dto'

require('dotenv/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


@Controller('auth/login')
export class LoginController {

	constructor(
		private user: UserService,
	) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async post(@Body() valid: LoginRequest) {
		const user = await this.user.where({'email': valid['email']})
		// console.log('user',user)
		// console.log('valid',valid)
		if(!user) {
			return {status: false, result: false, message: 'User not found !'}
		}

		const password = await bcrypt.compare(valid['password'], user.password)
		if (!password) return {status: false, result: false, message: 'Email / password failed !'}

		delete user.password

		try{
			return {
				status: true, 
				result: {
					token: await jwt.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_LIFETIME}`}), 
					expired: `${process.env.JWT_LIFETIME}`,
					user: user
				},
				message: true
			}
		}catch(error) {
			return {status: false, result: valid, message: error.detail}
		}
	}
}