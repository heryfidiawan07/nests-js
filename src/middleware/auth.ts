import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user/user.service'
import { RoleUserService } from '../roleUser/roleUser.service'
import { MenuService } from '../menu/menu.service'
import { PermissionService } from '../permission/permission.service'
import 'dotenv/config';

const jwt = require('jsonwebtoken')

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
    constructor(
        private user: UserService,
        private menu: MenuService,
        private roleUser: RoleUserService,
        private permission: PermissionService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        // console.log('AuthMiddleware Request...');
        // console.log('req originalUrl',req.originalUrl)
        // console.log('req path',req.path)
        // console.log('req baseUrl',req.baseUrl)
        // console.log('req method',req.method)
    
        // const ContentType   = req.header('Content-Type')
        const Authorization = req.header('Authorization')
        const requestName = req.header('Request-Name')
        const route = req.baseUrl.replace('/', '')

        if (!Authorization) return res.send({status: false, result: false, message: 'Token Invalid !'})
        if (!requestName) return res.send({status: false, result: false, message: 'Request Invalid !'})

        try{
            const exceptRoute = ['test','tost']
            const exceptAction = ['index','download']

            if (exceptRoute.includes(route)) {
                // console.log('Route Except')
                if (exceptAction.includes(requestName)) {
                    // console.log('Ection Except')
                    return next()
                }
            }

            const menu = await this.menu.whereFirst({route: route})
            // console.log('menu',menu)
            if(!menu) {
                return res.send({status: false, result: false, message: 'Route not found !'})
            }

            const verified = await jwt.verify(Authorization, process.env.JWT_SECRET)
            // console.log('verified',verified)
            const roleUser = await this.roleUser.where({userId: verified._id})
            // console.log('roleUser',roleUser)
            if(roleUser.length < 1) {
                return res.send({status: false, result: false, message: 'Route access denied !'})
            }
      
            // get role by user sign in
            let authRole = []
            await roleUser.forEach(val => {
                authRole.push({roleId: val.roleId})
            })
            // console.log('authRole',authRole)

            const permissions = await this.permission.where(authRole)
            // console.log('permissions',permissions)

            // // get actions in current route
            let actions = []
            await permissions.forEach(val => {
                actions.push(val.action)
            }) 
            console.log('actions',actions)

            if (!actions.includes(requestName)) {
                return res.send({status: false, result: false, message: 'Action denied !'})
            }

            next()

        }catch(error) {
            console.log('error',error)
            const inTime = Math.floor(new Date(error.expiredAt).getTime()/1000) - Math.floor(new Date().getTime()/1000)
            const check  = inTime + 7200

            if (check > 0) {
                const oldToken = jwt.verify(Authorization, process.env.JWT_SECRET, {ignoreExpiration: true})
                const user = await this.user.first(oldToken._id)
                return res.send({
                    status: false, 
                    result: {
                        token: await jwt.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_LIFETIME}`}), 
                        expired: `${process.env.JWT_LIFETIME}`,
                        user: user
                    },
                    message: 'Refresh Token'
                })
            }

            error.inTime = inTime
            return res.send({status: false, result: error, message: 'Error'})
        }
    }
}
