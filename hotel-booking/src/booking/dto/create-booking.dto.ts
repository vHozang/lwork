import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateBookingDto {

    @IsNumber()
    @IsNotEmpty()
    rooms: number
}