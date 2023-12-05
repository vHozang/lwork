import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema()
export class Hotel extends mongoose.Document {

    @Prop({required: true, trim: true})
    name: string

    @Prop({default: 4, min: 0, max: 5})
    ratings: number

    @Prop({required: true})
    address: string

    @Prop({required: true})
    city: string

    @Prop({required: true})
    price: number
    
    @Prop({enum: ['draft', 'submitted', 'approved'], default: "draft"})
    submitStatus: string

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({type: Boolean, default: true})
    active: Boolean
}

export const HotelSchema = SchemaFactory.createForClass(Hotel)

// HotelSchema.pre<any>(/^find/, async function() {
//     console.log(this.getQuery())
//     if(this.getQuery()?.filterApproved){
//         this.find({submitStatus: 'approved'})
//     }
// })