import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../entities';
import { Company } from '../database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<string> {
    const item = await this.companyModel.create({
      email: dto.email,
      password: dto.password,
      name: dto.name,
      logo: dto.logo,
    });
    return item._id.toString();
  }

  async getById(id: string): Promise<CompanyEntity> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');
    const item = await this.companyModel.findById(id);
    if (!item) return null;
    return this.toCompanyEntity(item);
  }

  async getByEmail(email: string): Promise<CompanyEntity> {
    const item = await this.companyModel.findOne({ email });
    if (!item) return null;
    return this.toCompanyEntity(item);
  }

  async getAll(): Promise<CompanyEntity[]> {
    const items = await this.companyModel.find();
    return items.map((item) => this.toCompanyEntity(item));
  }

  async updateById(id: string, update: UpdateCompanyDto): Promise<boolean> {
    if (!isValidObjectId(id)) throw new Error('Invalid id');

    const updateQuery: UpdateQuery<Company> = {
      logo: update.logo,
    };
    const item = await this.companyModel.findByIdAndUpdate(id, updateQuery);
    return item ? true : false;
  }

  private toCompanyEntity(company: Company): CompanyEntity {
    const companyEntity = new CompanyEntity();
    companyEntity.id = company._id.toString();
    companyEntity.email = company.email;
    companyEntity.password = company.password;
    companyEntity.name = company.name;
    companyEntity.logo = company.logo;
    return companyEntity;
  }
}
