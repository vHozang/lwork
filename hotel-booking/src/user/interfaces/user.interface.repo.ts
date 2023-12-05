import { UserI, UserIPassword } from "./user.interface";

export interface UserIRepo {
    getAll(): Promise<UserI[]>;
    create(user: UserI): Promise<UserI>;
    getOne(email: string): Promise<UserIPassword>;
     getId(id: string): Promise<UserI>
}