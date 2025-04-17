import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Regex } from 'src/Constants/regex';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, minlength: 3 })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true, match: Regex.emailPattern })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
