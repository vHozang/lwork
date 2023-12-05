import { Module, forwardRef } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './booking.repository';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Booking', schema: BookingSchema}
    ]),
    forwardRef(() => HotelModule)
  ],
  controllers: [BookingController],
  providers: [
    BookingService, 
    {
      provide: "BookingIRepo",
      useClass: BookingRepository
    }, 
    {
      provide: "BookingIService",
      useClass: BookingService
    }
  ],
  exports: [BookingService]
})
export class BookingModule {}
