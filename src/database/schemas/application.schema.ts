import { Document, SchemaTypes, Types } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Applicant } from './applicant.schema';
import { Job } from './job.schema';
import { ApplicationStatus } from '../../enums';

@Schema({ collection: 'Application' })
export class Application extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Job.name,
    required: true,
  })
  jobId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Applicant.name,
    required: true,
  })
  applicantId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ApplicationStatus,
    required: true,
  })
  status: ApplicationStatus;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

export const ApplicationModelDefinition: ModelDefinition = {
  name: Application.name,
  schema: ApplicationSchema,
};
