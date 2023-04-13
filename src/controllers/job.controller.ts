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
import { JobService } from '../services';
import { CreateJobDto, GetJobsDto, UpdateJobDto } from '../dtos';
import { JobPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'jobs' })
@ApiTags('Jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  createJob(@Body() body: CreateJobDto): Promise<string> {
    return this.jobService.createJob(body);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok.',
    type: JobPresenter,
  })
  async getJobById(@Param('id') id: string): Promise<JobPresenter> {
    const job = await this.jobService.getJobById(id);
    return new JobPresenter(job);
  }

  @Get()
  @ApiOkResponse({
    description: 'Ok.',
    type: JobPresenter,
    isArray: true,
  })
  async getJobs(@Body() body: GetJobsDto): Promise<JobPresenter[]> {
    const jobs = await this.jobService.getJobs(body);
    return jobs.map((job) => new JobPresenter(job));
  }

  @Put(':id')
  updateJobById(
    @Param('id') id: string,
    @Body() body: UpdateJobDto,
  ): Promise<void> {
    return this.jobService.updateJobById(id, body);
  }

  @Delete(':id')
  deleteJobById(@Param('id') id: string): Promise<void> {
    return this.jobService.deleteJobById(id);
  }
}
