import { IsString, IsEmail, IsArray, MinLength } from 'class-validator';

export class UserRequest {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8, {
        message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
    })
    password: string;

    @IsArray()
    roles: []
}