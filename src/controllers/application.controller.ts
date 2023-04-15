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
import { ApplicationService } from '../services';
import {
  CreateApplicationDto,
  GetApplicationsDto,
  UpdateApplicationDto,
} from '../dtos';
import { ApplicationPresenter } from '../presenters';

@Controller({ version: 'v1', path: 'applications' })
@ApiTags('Applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicationPresenter,
  })
  async createApplication(
    @Body() body: CreateApplicationDto,
  ): Promise<ApplicationPresenter> {
    const application = await this.applicationService.createApplication(body);
    return new ApplicationPresenter(application);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicationPresenter,
  })
  async getApplicationById(
    @Param('id') id: string,
  ): Promise<ApplicationPresenter> {
    const application = await this.applicationService.getApplicationById(id);
    return new ApplicationPresenter(application);
  }

  @Get()
  @ApiOkResponse({
    description: 'Ok.',
    type: ApplicationPresenter,
    isArray: true,
  })
  async getCompanies(
    @Body() body: GetApplicationsDto,
  ): Promise<ApplicationPresenter[]> {
    const applications = await this.applicationService.getApplications(body);
    return applications.map(
      (application) => new ApplicationPresenter(application),
    );
  }

  @Put(':id')
  updateApplicationById(
    @Param('id') id: string,
    @Body() body: UpdateApplicationDto,
  ): Promise<void> {
    return this.applicationService.updateApplicationById(id, body);
  }

  @Delete(':id')
  deleteApplicationById(@Param('id') id: string): Promise<void> {
    return this.applicationService.deleteApplicationById(id);
  }
}
