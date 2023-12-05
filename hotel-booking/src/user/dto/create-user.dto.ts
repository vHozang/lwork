import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {

    @IsEmail()
    @IsString()
    email: string

    @Length(6, 20)
    @IsString()
    passwordNonEncrypt: string

    @IsNotEmpty()
    @IsString()
    accountType: string
}