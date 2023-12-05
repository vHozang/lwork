import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { BookingI } from './interfaces/booking.interface';
import { HotelService } from 'src/hotel/hotel.service';
import { BookingIRepo } from './interfaces/booking.inte.repo';
import { BookingIService } from './interfaces/booking.inte.ser';
import { queryFormat } from 'src/shared/formatQuery';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService implements BookingIService {
    constructor(
        @Inject('BookingIRepo')private bookingRepo: BookingIRepo,
        @Inject(forwardRef(() => HotelService)) private hotelService: HotelService
    ) {}

    async findQuery(query: Object, providerId?: string): Promise<BookingI[]> {
        const formatQuery = queryFormat(query)
        return providerId?  this.bookingRepo.findQueryProvider(formatQuery, providerId) : this.bookingRepo.findQuery(formatQuery)
    }

    async getOne(bookingId: string): Promise<BookingI> {
        const booking = await this.bookingRepo.getOne(bookingId)
        if(!booking){
            throw new NotFoundException("Booking not exist")
        }
        return booking;
    }

    async create(bookingInfo: CreateBookingDto,hotelId: string, req): Promise<BookingI> {
        const hotel = await this.hotelService.getOne(hotelId)
        //Payment method module
        const paid = false;
        if(!hotel) {
            throw new NotFoundException('hotel id not found')
        }
        const bookingData = {
            ...bookingInfo,
            hotel: hotelId,
            user: req.user.sub, //   get user id through Req object after login
            price: hotel.price * bookingInfo.rooms, //   price: hotel.price x how many room booking        
            alreadyPaid: paid? true: false
        }
        return this.bookingRepo.create(bookingData)
    }
}
