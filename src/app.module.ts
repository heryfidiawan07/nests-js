import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { database } from './config/database';
import { AuthMiddleware } from './middleware/auth';

import { Parent } from './parent/parent.entity';
import { ParentService } from './parent/parent.service';

import { Menu } from './menu/menu.entity';
import { MenuService } from './menu/menu.service';

import { Permission } from './permission/permission.entity';
import { PermissionService } from './permission/permission.service'

import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

import { Role } from './role/role.entity';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';

import { RoleUser } from './roleUser/roleUser.entity';
import { RoleUserService } from './roleUser/roleUser.service';

import { LoginController } from './auth/login.controller';
import { RegisterController } from './auth/register.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(database),
    TypeOrmModule.forFeature([Parent, Menu, Permission, User, Role, RoleUser])
  ],
  controllers: [
    AppController,
    RegisterController,
    LoginController, 
    UserController,
    RoleController
  ],
  providers: [
    AppService,
    ParentService,
    MenuService,
    PermissionService,
    UserService,
    RoleService,
    RoleUserService
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'register', method: RequestMethod.POST },
        'auth/(.*)',
      )
      .forRoutes('*');
      // .forRoutes('user');
  }
}
