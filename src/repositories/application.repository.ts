import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../entities';
import { Application } from '../database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { CreateApplicationBDDto, UpdateApplicationDto } from '../dtos';
import { ObjectId } from 'mongodb';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async create(dto: CreateApplicationBDDto): Promise<string> {
    if (!isValidObjectId(dto.jobId)) throw new Error('Invalid job id');
    if (!isValidObjectId(dto.applicantId))
      throw new Error('Invalid applicant id');

    const item = await this.applicationModel.create({
      jobId: new ObjectId(dto.jobId),
      applicantId: new ObjectId(dto.applicantId),
      status: dto.status,
    });
    return item._id.toString();
  }

  async getById(id: string): Promise<ApplicationEntity> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');
    const item = await this.applicationModel.findById(id);
    if (!item) return null;
    return this.toApplicationEntity(item);
  }

  async getAll(): Promise<ApplicationEntity[]> {
    const items = await this.applicationModel.find();
    return items.map((item) => this.toApplicationEntity(item));
  }

  async updateById(id: string, update: UpdateApplicationDto): Promise<boolean> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');

    const updateQuery: UpdateQuery<Application> = {
      status: update.status,
    };
    const item = await this.applicationModel.findByIdAndUpdate(id, updateQuery);
    return item ? true : false;
  }

  private toApplicationEntity(application: Application): ApplicationEntity {
    const applicationEntity = new ApplicationEntity();
    applicationEntity.id = application._id.toString();
    applicationEntity.jobId = application.jobId.toString();
    applicationEntity.applicantId = application.applicantId.toString();
    applicationEntity.status = application.status;
    return applicationEntity;
  }
}
