import { Controller, Get, Inject, Param, Query, Post, Req, UseGuards, forwardRef, Body } from '@nestjs/common';

import { HotelIDetails, HotelI } from '../interfaces/hotel.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HotelIRepo } from '../interfaces/hotel.interface.repo';
import { HotelIService } from '../interfaces/hotel.interface.service';
import { BookingService } from 'src/booking/booking.service';
import { BookingI } from 'src/booking/interfaces/booking.interface';
import { BookingIService } from 'src/booking/interfaces/booking.inte.ser';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';

@Controller('client')
export class HotelController {
    constructor(
        @Inject('HotelIRepo') private hotelRepo: HotelIRepo, 
        @Inject('HotelIService') private hotelService: HotelIService,
        @Inject(forwardRef(() => BookingService)) private bookingService: BookingIService
        ){}

    @Get()
    async getAll(@Query() query: any): Promise<HotelI[]> {
        return this.hotelService.getApprovedHotels(query);
    }

    @Get(':id')
    async getOne(@Param() params: any): Promise<HotelIDetails> {
        return this.hotelRepo.getOne(params.id)
    }

    //Booking hotel
    @Roles('client', 'admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Post(':id/booking')
    async createBooking(@Body() booking: CreateBookingDto, @Param() params: any, @Req() req): Promise<BookingI> {
        return this.bookingService.create(booking ,params.id, req)
    }
}
