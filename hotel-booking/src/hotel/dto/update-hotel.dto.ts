import { Length, IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator"

export class UpdateHotelDto {

    @IsString()
    @Length(3, 20)
    @IsOptional()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    ratings: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    price: number

    @IsOptional()
    user: string

    @IsOptional()
    active: boolean
}