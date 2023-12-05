import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator"

export class SigninDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}