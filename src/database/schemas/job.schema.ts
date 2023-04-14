import { Document, SchemaTypes, Types } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from './company.schema';

@Schema({ collection: 'Job' })
export class Job extends Document {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Company.name,
    required: true,
  })
  companyId: Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);

export const JobModelDefinition: ModelDefinition = {
  name: Job.name,
  schema: JobSchema,
};
