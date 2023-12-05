import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';

import { BookingI } from './interfaces/booking.interface';
import { Request } from 'src/shared/req.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BookingIService } from './interfaces/booking.inte.ser';
import { BookingIRepo } from './interfaces/booking.inte.repo';

@Controller('booking')
export class BookingController {
    constructor(
        @Inject('BookingIService') private bookingService: BookingIService, 
        @Inject('BookingIRepo')private bookingRepo: BookingIRepo){}

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAll(@Query() query: string): Promise<BookingI[]> {
        return this.bookingService.findQuery(query)
    }

    @Get('client')
    @UseGuards(AuthGuard)
    async getMyBooking(@Req() req: Request): Promise<BookingI[]> {
        return this.bookingRepo.findParams({user: req.user.sub})
    }

    @Roles('provider')
    @Get('provider')
    @UseGuards(AuthGuard, RolesGuard)
    async getMyHotelBookings(@Query() query: string, @Req() req: Request): Promise<BookingI[]> {
        return this.bookingService.findQuery(query, req.user.sub)
    }

}
