import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'User' })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
