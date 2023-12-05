import { Inject, Injectable } from '@nestjs/common';
import { UserIRepo } from './interfaces/user.interface.repo';
import { UserIPassword } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@Inject('UserIRepo') private userRepo: UserIRepo){}

    async getOne(email: string): Promise<UserIPassword> {
        return this.userRepo.getOne(email);
    }
}
