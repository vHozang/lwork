import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends mongoose.Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordNonEncrypt: string;

  @Prop({ default: 'client' })
  accountType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.correctPassword = function (inputPassword: string) {
  return inputPassword === this.passwordNonEncrypt;
};
