import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Company' })
export class Company extends Document {
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

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  logo: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export const CompanyModelDefinition: ModelDefinition = {
  name: Company.name,
  schema: CompanySchema,
};
