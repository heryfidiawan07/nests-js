import { IsEmail, MinLength } from 'class-validator';

export class LoginRequest {
    @IsEmail()
    email: string;

    @MinLength(8, {
        message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
    })
    password: string;
}