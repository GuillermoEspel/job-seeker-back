import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Applicant' })
export class Applicant extends Document {
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

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);

export const ApplicantModelDefinition: ModelDefinition = {
  name: Applicant.name,
  schema: ApplicantSchema,
};
