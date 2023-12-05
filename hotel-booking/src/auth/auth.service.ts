import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(bodyData: SigninDto){
        const {email, password} = bodyData

        const user = await this.userService.getOne(email);

        if(!user || !user.correctPassword(password)){
            throw new UnauthorizedException('incorrect email or password')
        }
        //console.log(user.id)
        const payload = {sub: user.id, accountType: user.accountType}
        return {accessToken: await this.jwtService.signAsync(payload), accountType: user.accountType}  
    }
}
