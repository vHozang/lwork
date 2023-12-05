import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { UserI } from './interfaces/user.interface';
import { UserIRepo } from './interfaces/user.interface.repo';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(@Inject('UserIRepo') private userRepo: UserIRepo){}
    
    @Get()
    async getAll(): Promise<UserI[]> {
        return this.userRepo.getAll()
    }

    @Get(':id')
    async getId(@Param() params: any): Promise<UserI> {
        return this.userRepo.getId(params.id)
    }

    @Post()
    async create(@Body() user: CreateUserDto): Promise<UserI> {
        const exist = await this.userRepo.getOne(user.email)
        if(exist){
            throw new HttpException('emails already exist', HttpStatus.BAD_REQUEST)
        }
        return this.userRepo.create(user);   
    }
}
