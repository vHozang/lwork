import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SigninDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Request } from 'src/shared/req.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async signIn(@Body() body: SigninDto) {
        return this.authService.signIn(body);
    }

    @Roles('admin')
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    getProfile(@Req() req: Request){
        return req.user;
    }
}
