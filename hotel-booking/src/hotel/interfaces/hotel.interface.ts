import mongoose from "mongoose"

export interface HotelI {
    name: string
    ratings: number
    address: string
    city: string
    price: number
}

export interface HotelIDetails extends HotelI {
    submitStatus: string
    createdAt?: Date
    owner: mongoose.Schema.Types.ObjectId
}