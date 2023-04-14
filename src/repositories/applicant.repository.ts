import { Injectable } from '@nestjs/common';
import { ApplicantEntity } from '../entities';
import { Applicant } from '../database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { CreateApplicantDto, UpdateApplicantDto } from '../dtos';

@Injectable()
export class ApplicantRepository {
  constructor(
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<Applicant>,
  ) {}

  async create(dto: CreateApplicantDto): Promise<string> {
    const item = await this.applicantModel.create({
      email: dto.email,
      password: dto.password,
    });
    return item._id.toString();
  }

  async getById(id: string): Promise<ApplicantEntity> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');
    const item = await this.applicantModel.findById(id);
    if (!item) return null;
    return this.toApplicantEntity(item);
  }

  async getByEmail(email: string): Promise<ApplicantEntity> {
    const item = await this.applicantModel.findOne({ email });
    if (!item) return null;
    return this.toApplicantEntity(item);
  }

  async getAll(): Promise<ApplicantEntity[]> {
    const items = await this.applicantModel.find();
    return items.map((item) => this.toApplicantEntity(item));
  }

  async updateById(id: string, update: UpdateApplicantDto): Promise<boolean> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');

    const updateQuery: UpdateQuery<Applicant> = {
      password: update.password,
    };
    const item = await this.applicantModel.findByIdAndUpdate(id, updateQuery);
    return item ? true : false;
  }

  private toApplicantEntity(applicant: Applicant): ApplicantEntity {
    const applicantEntity = new ApplicantEntity();
    applicantEntity.id = applicant._id.toString();
    applicantEntity.email = applicant.email;
    applicantEntity.password = applicant.password;
    return applicantEntity;
  }
}
