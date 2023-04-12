import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services';

@Controller({ version: 'v1', path: 'health' })
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  health(): string {
    return this.healthService.health();
  }
}
