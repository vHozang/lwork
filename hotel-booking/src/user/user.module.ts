import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "User", schema: UserSchema}
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    { 
    provide: 'UserIRepo', 
    useClass: UserRepository 
    }
  ], 
  exports: [UserService]
})
export class UserModule {}
