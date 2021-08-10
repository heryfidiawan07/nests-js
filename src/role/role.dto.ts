import { IsString, IsEmail, IsArray, MinLength } from 'class-validator';

export class RoleRequest {
    @IsString()
    name: string
}