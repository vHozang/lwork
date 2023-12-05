import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { Hotel } from 'src/hotel/schema/hotel.schema';

@Schema()
export class Booking {

    @Prop({required: [true, 'Which tour this booking belong?'], type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
    hotel: Hotel
    
    @Prop({required: [true, 'Which user booking this?'], type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({required: true, default: 1})
    rooms: number

    @Prop({required: true})
    price: number

    @Prop({default: Date.now()})
    createAt: Date

    @Prop({default: false})
    alreadyPaid: boolean

}

export const BookingSchema = SchemaFactory.createForClass(Booking)

BookingSchema.pre<mongoose.Query<any, Booking>>(/^find/, function(){
    this.populate({
        path: 'user',
        select: 'email -_id',
      })
})
