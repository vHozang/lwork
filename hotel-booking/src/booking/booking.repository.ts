import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from "@nestjs/common";
import { BookingI } from "./interfaces/booking.interface";
import { BookingIRepo } from "./interfaces/booking.inte.repo";

@Injectable()
export class BookingRepository implements BookingIRepo {
    constructor(@InjectModel('Booking') private bookingModel: Model<BookingI>){}

    async getOne(id: string): Promise<BookingI> {
        return this.bookingModel.findById(id).lean()
    }

    async findParams(params: Object): Promise<BookingI[]>{
        return this.bookingModel.find(params).populate({
            path: 'hotel',
            select: 'name owner',
          }).lean()
    }

    async findQuery(query: Object): Promise<BookingI[]> {
        return this.bookingModel.find(query).populate({
          path: 'hotel',
          select: 'name owner',
        }).lean()
    }

    async findQueryProvider(query: Object, providerId): Promise<BookingI[]> {
        const bookings = await this.bookingModel.find(query).populate({
            path: 'hotel',
            match: {owner: providerId},
            select: 'name owner',
          }).lean();
        return bookings.filter((b)=>b.hotel)
    }

    async create(booking: BookingI): Promise<BookingI> {
        return this.bookingModel.create(booking)
    }
}