import { Model, Types } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from "@nestjs/common";

import { HotelI, HotelIDetails } from "./interfaces/hotel.interface";
import { HotelIRepo } from "./interfaces/hotel.interface.repo";

@Injectable()
export class HotelRepository implements HotelIRepo {
    constructor(@InjectModel('Hotel') private hotelModel: Model<HotelI>){}

    async getOne(id: string): Promise<HotelIDetails> {
        return this.hotelModel.findById(id).lean()
    }

    async findQuery(query: Object): Promise<HotelIDetails[]> {
        //console.log(queryJson)
        return this.hotelModel.find(query).lean();
    }

    async findParams(params: Object): Promise<HotelIDetails> {
        return this.hotelModel.findOne(params).lean()
    }

    async create(hotel: HotelIDetails): Promise<HotelI | HotelIDetails> {
        return this.hotelModel.create(hotel)
    }

    async update(hotelId: string, newData: HotelI): Promise<HotelIDetails> {
        return this.hotelModel.findByIdAndUpdate(hotelId, newData, {
            new: true,
            runValidators: true
        })
    }
    
    async changeStatus(hotelId: string, statusData: string): Promise<HotelIDetails> {
        return this.hotelModel.findByIdAndUpdate(hotelId, {submitStatus: statusData}, {new: true})
    }
}