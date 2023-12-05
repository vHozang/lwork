import { UpdateHotelDto } from "../dto/update-hotel.dto"
import { HotelIDetails, HotelI } from "./hotel.interface"

export interface HotelIRepo {
    create(hotel: HotelI): Promise<HotelI | HotelIDetails>

    update(hotelId: string, newData: UpdateHotelDto): Promise<HotelIDetails>

    changeStatus(hotelId: string, statusData: string): Promise<HotelIDetails>
    
    getOne(id: string): Promise<HotelIDetails>
    findQuery(query: Object): Promise<HotelIDetails[]>
    findParams(params: Object): Promise<HotelIDetails>
}