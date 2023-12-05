import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose'
import { UserI, UserIPassword } from "./interfaces/user.interface";
import { Injectable } from "@nestjs/common";
import { UserIRepo } from "./interfaces/user.interface.repo";

@Injectable()
export class UserRepository implements UserIRepo {
    constructor(@InjectModel('User') private userModel: Model<UserI>){}

    async getAll(): Promise<UserI[]> {
        return this.userModel.find()
    }

    async getId(id: string): Promise<UserI> {
        return this.userModel.findById(id)
    }

    async getOne(email: string): Promise<UserIPassword> {
        return this.userModel.findOne({email});
    }

    async create(user: UserI): Promise<UserI> {
        return this.userModel.create(user)
    }
}