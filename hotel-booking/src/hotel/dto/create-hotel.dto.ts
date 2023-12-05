import { Length, IsNotEmpty, IsString, IsNumber } from "class-validator"

export class CreateHotelDto {

    @IsString()
    @Length(3, 20)
    name: string

    @IsNumber()
    @IsNotEmpty()
    ratings: number

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsNumber()
    @IsNotEmpty()
    price: number
}