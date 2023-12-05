import { CreateHotelDto } from "../dto/create-hotel.dto";
import { UpdateHotelDto } from "../dto/update-hotel.dto";
import { HotelI, HotelIDetails } from "./hotel.interface";
import { Request } from "src/shared/req.interface";

export interface HotelIService {
    getQuery(query: Object, providerId?: string): Promise<HotelIDetails[]>
    getApprovedHotels(query: Object): Promise<HotelIDetails[]>
    getOne(hotelId: string): Promise<HotelIDetails>

    create(req: Request, hotel: CreateHotelDto): Promise<HotelI | HotelIDetails>
    
    providerUpdate(hotelId: string, newData: UpdateHotelDto, req: Request): Promise<HotelIDetails>
    adminUpdate(hotelId: string, newData: UpdateHotelDto): Promise<HotelIDetails>
    changeStatus(hotelId: string, req: string): Promise<HotelIDetails>
}