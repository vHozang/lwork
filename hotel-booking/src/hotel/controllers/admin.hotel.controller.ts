import { Controller, Patch, Inject, Get, Req, Param, Query, Body, UseGuards } from '@nestjs/common';

import { HotelIRepo } from '../interfaces/hotel.interface.repo';
import { HotelIService } from '../interfaces/hotel.interface.service';
import { HotelI, HotelIDetails } from '../interfaces/hotel.interface';
import { Request } from 'src/shared/req.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

//..:/hotel/admin
@Controller('admin')
export class AdminHotelController {
    constructor(
        @Inject('HotelIRepo') private hotelRepo: HotelIRepo, 
        @Inject('HotelIService') private hotelService: HotelIService,
    ){}

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAll(@Query() query: string): Promise<HotelI[]> {
        return this.hotelService.getQuery(query);
    }

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param() params: any): Promise<HotelIDetails> {
        return this.hotelRepo.getOne(params.id)
    }

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Patch(':id')
    async update(@Param() params: any, @Body() hotel: UpdateHotelDto): Promise<HotelI | HotelIDetails>{
        return this.hotelService.adminUpdate(params.id , hotel);
    }

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Patch(':id/status')
    async changeStatus(@Param() params: any, @Req() req: Request){
        return this.hotelService.changeStatus(params.id, req.user.accountType)
        //return this.hotelRepo.findQuery({_id: params.id, owner: req.user.sub})
    }
    
}
