import { ApiProperty } from '@nestjs/swagger';
import { JobEntity } from '../entities';

const jobPresenterExample: JobPresenter = {
  id: '63d2e28f18828f9cc35369aa',
  title: 'Title A',
  description: 'Description A',
};

export class JobPresenter {
  @ApiProperty({
    description: 'Job ID.',
    example: jobPresenterExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Job title.',
    example: jobPresenterExample.title,
  })
  title: string;

  @ApiProperty({
    description: 'Job description.',
    example: jobPresenterExample.description,
  })
  description: string;

  constructor(job: JobEntity) {
    this.id = job.id;
    this.title = job.title;
    this.description = job.description;
  }
}
