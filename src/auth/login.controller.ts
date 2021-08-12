import { Controller, UsePipes, ValidationPipe, Body, Post } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginRequest } from './login.dto'
import { RoleUserService } from '../roleUser/roleUser.service'
import { PermissionService } from '../permission/permission.service'
import { MenuService } from '../menu/menu.service'
import { ParentService } from '../parent/parent.service'

require('dotenv/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


@Controller('auth/login')
export class LoginController {

	constructor(
		private user: UserService,
		private roleUser: RoleUserService,
		private permission: PermissionService,
		private menu: MenuService,
		private parent: ParentService,
	) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async post(@Body() valid: LoginRequest) {
		const user = await this.user.whereFirst({'email': valid['email']})
		// console.log('user',user)
		// console.log('valid',valid)
		if(!user) {
			return {status: false, result: false, message: 'User not found !'}
		}

		const password = await bcrypt.compare(valid['password'], user.password)
		if (!password) return {status: false, result: false, message: 'Email / password failed !'}
		delete user.password

        const roleUser = await this.roleUser.where({user_id: user.id})
        // console.log('roleUser',roleUser)
        if(roleUser.length < 1) {
            return {status: false, result: false, message: "User doesn't have role !"}
        }

        // get role by user sign in
        let authRole = []
        await roleUser.forEach(val => {
            authRole.push({role_id: val.role_id})
        })
        // console.log('authRole',authRole)

		const permissions = await this.permission.where(authRole)
        // console.log('permissions',permissions)

        // get menu by user sign in
        let authMenu = []
        await permissions.forEach(val => {
            authMenu.push({id: val.menu_id})
        })
        console.log('authMenu',authMenu)

        const menus = await this.menu.where(authMenu)
        console.log('menus',menus)

        let parentId = []
        await menus.forEach(val => {
        	if(val.parent_id) {
            	parentId.push({id: val.parent_id})
        	}
        })
        console.log('parentId',parentId)

        const parents = await this.parent.where(parentId)
        console.log('parents',parents)

		try{
			return {
				status: true, 
				result: {
					token: await jwt.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_LIFETIME}`}), 
					expired: `${process.env.JWT_LIFETIME}`,
					user: user,
					parent: parents,
					menu: menus,
				},
				message: true
			}
		}catch(error) {
			return {status: false, result: valid, message: error.detail}
		}
	}
}