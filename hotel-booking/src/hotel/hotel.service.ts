import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HotelIDetails, HotelI } from './interfaces/hotel.interface';
import { HotelIRepo } from './interfaces/hotel.interface.repo';
import { Request } from 'src/shared/req.interface';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { HotelIService } from './interfaces/hotel.interface.service';
import { queryFormat } from 'src/shared/formatQuery';


@Injectable()
export class HotelService implements HotelIService {
    constructor(@Inject('HotelIRepo') private hotelRepo: HotelIRepo){}

    async getQuery(query: Object, providerId?: string): Promise<HotelIDetails[]>{
        return providerId? 
        this.hotelRepo.findQuery(queryFormat({...query, owner: providerId})):
        this.hotelRepo.findQuery(queryFormat(query))
    }


    async getApprovedHotels(query: Object): Promise<HotelIDetails[]>{
        const filterQuerry = {...query, submitStatus: "approved" } //{ ..., submitStatus: 'approved' }
        return this.hotelRepo.findQuery(queryFormat(filterQuerry))
    }

    async getOne(hotelId: string): Promise<HotelIDetails> {
        const hotel = this.hotelRepo.getOne(hotelId)
        if(!hotel){
            throw new NotFoundException('Hotel not exist')
        }
        return hotel
    }

    async create(req: Request, hotel: CreateHotelDto): Promise<HotelI | HotelIDetails>{
        const formatHotel = {...hotel, owner: req.user.sub}
        return this.hotelRepo.create(formatHotel)
    }

    async providerUpdate(hotelId: string, newData: UpdateHotelDto, req: Request): Promise<HotelIDetails> {
        const hotel = await this.hotelRepo.findParams({_id: hotelId, owner: req.user.sub})
        if(!hotel){
            throw new NotFoundException('Hotel not exist')
        }
        if(hotel.submitStatus !== 'draft'){
            throw new UnauthorizedException("You not allow to edit this")
        }
        const formatHotel = {...newData, createdAt: new Date(Date.now())}
        return this.hotelRepo.update(hotelId, formatHotel)
    }

    async adminUpdate(hotelId: string, newData: UpdateHotelDto): Promise<HotelIDetails> {
        const hotel = await this.hotelRepo.getOne(hotelId)
        if(!hotel){
            throw new NotFoundException('Hotel not exist')
        }
        return this.hotelRepo.update(hotelId, newData)
    }

    async changeStatus(hotelId: string, accountType: string): Promise<HotelIDetails> {
        if(accountType === 'admin'){
            return this.hotelRepo.changeStatus(hotelId, "approved")
        }
        return this.hotelRepo.changeStatus(hotelId, "submitted")
    }
}
