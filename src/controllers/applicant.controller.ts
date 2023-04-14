import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApplicantService } from '../services';
import {
  CreateApplicantDto,
  GetApplicantsDto,
  UpdateApplicantDto,
} from '../dtos';
import { ApplicantPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'applicants' })
@ApiTags('Applicants')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicantPresenter,
  })
  async createApplicant(
    @Body() body: CreateApplicantDto,
  ): Promise<ApplicantPresenter> {
    const applicant = await this.applicantService.createApplicant(body);
    return new ApplicantPresenter(applicant);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicantPresenter,
  })
  async getApplicantById(@Param('id') id: string): Promise<ApplicantPresenter> {
    const applicant = await this.applicantService.getApplicantById(id);
    return new ApplicantPresenter(applicant);
  }

  @Get()
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicantPresenter,
    isArray: true,
  })
  async getApplicants(
    @Body() body: GetApplicantsDto,
  ): Promise<ApplicantPresenter[]> {
    const applicants = await this.applicantService.getApplicants(body);
    return applicants.map((applicant) => new ApplicantPresenter(applicant));
  }

  @Put(':id')
  updateApplicantById(
    @Param('id') id: string,
    @Body() body: UpdateApplicantDto,
  ): Promise<void> {
    return this.applicantService.updateApplicantById(id, body);
  }

  @Delete(':id')
  deleteApplicantById(@Param('id') id: string): Promise<void> {
    return this.applicantService.deleteApplicantById(id);
  }
}
