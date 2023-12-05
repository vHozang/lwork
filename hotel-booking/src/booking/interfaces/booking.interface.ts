import mongoose from "mongoose"

export interface BookingI {
    hotel:  mongoose.Schema.Types.ObjectId
    user:  mongoose.Schema.Types.ObjectId
    price: number
    createAt: Date
    alreadyPaid: boolean
}