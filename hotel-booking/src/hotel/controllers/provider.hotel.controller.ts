import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseGuards, Query } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { HotelI, HotelIDetails } from '../interfaces/hotel.interface';
import { HotelIRepo } from '../interfaces/hotel.interface.repo';
import { HotelIService } from '../interfaces/hotel.interface.service';
import { Request } from 'src/shared/req.interface';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

@Controller('provider')
export class ProviderHotelController {
    constructor(
        @Inject('HotelIRepo') private hotelRepo: HotelIRepo, 
        @Inject('HotelIService') private hotelService: HotelIService,
    ){}

    @Roles('provider')
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAll(@Query() query: string, @Req() req: Request): Promise<HotelI[]> {
        return this.hotelService.getQuery(query, req.user.sub)
    }

    @Roles('provider')
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param() params: any): Promise<HotelIDetails> {
        return this.hotelRepo.getOne(params.id)
    }

    @Roles('provider')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(@Req() req: Request, @Body() hotel: CreateHotelDto): Promise<HotelI | HotelIDetails>{
        return this.hotelService.create(req, hotel)
    }

    @Roles('provider')
    @UseGuards(AuthGuard, RolesGuard)
    @Patch(':id')
    async update(@Param() params: any, @Body() hotel: UpdateHotelDto, @Req() req: Request): Promise<HotelI | HotelIDetails>{
        return this.hotelService.providerUpdate(params.id , hotel, req);
    }

    @Roles('provider', 'admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Patch(':id/status')
    async changeStatus(@Param() params: any, @Req() req: Request){
        return this.hotelService.changeStatus(params.id, req.user.sub)
    }
}
