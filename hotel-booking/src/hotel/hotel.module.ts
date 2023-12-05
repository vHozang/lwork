import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { HotelController } from './controllers/client.hotel.controller';
import { HotelService } from './hotel.service';
import { HotelSchema } from './schema/hotel.schema';
import { HotelRepository } from './hotel.repository';
import { AuthModule } from 'src/auth/auth.module';;
import { BookingModule } from 'src/booking/booking.module';
import { AdminHotelController } from './controllers/admin.hotel.controller';
import { ProviderHotelController } from './controllers/provider.hotel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Hotel", schema: HotelSchema}
    ]),
    AuthModule,
    forwardRef(() => BookingModule)
  ],
  controllers: [HotelController, AdminHotelController, ProviderHotelController],
  providers: [
    {
      provide: "HotelIService",
      useClass: HotelService
    }, 
    {
      provide: "HotelIRepo",
      useClass: HotelRepository
    },
    HotelService, HotelRepository
  ],
  exports: [HotelService]
})
export class HotelModule {}
