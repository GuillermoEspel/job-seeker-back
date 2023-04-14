import { Injectable } from '@nestjs/common';
import { JobEntity } from '../entities';
import { Job } from '../database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { CreateJobDto, UpdateJobDto } from '../dtos';
import { ObjectId } from 'mongodb';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: Model<Job>,
  ) {}

  async create(dto: CreateJobDto): Promise<string> {
    if (!isValidObjectId(dto.companyId)) throw new Error('Invalid company id');

    const item = await this.jobModel.create({
      title: dto.title,
      description: dto.description,
      companyId: new ObjectId(dto.companyId),
    });
    return item._id.toString();
  }

  async getById(id: string): Promise<JobEntity> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');
    const item = await this.jobModel.findById(id);
    if (!item) return null;
    return this.toJobEntity(item);
  }

  async getAll(): Promise<JobEntity[]> {
    const items = await this.jobModel.find();
    return items.map((item) => this.toJobEntity(item));
  }

  async updateById(id: string, update: UpdateJobDto): Promise<boolean> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');

    const updateQuery: UpdateQuery<Job> = {
      description: update.description,
    };
    const item = await this.jobModel.findByIdAndUpdate(id, updateQuery);
    return item ? true : false;
  }

  private toJobEntity(job: Job): JobEntity {
    const jobEntity = new JobEntity();
    jobEntity.id = job._id.toString();
    jobEntity.title = job.title;
    jobEntity.description = job.description;
    jobEntity.companyId = job.companyId.toString();
    return jobEntity;
  }
}
