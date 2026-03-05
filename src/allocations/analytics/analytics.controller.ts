import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('allocations/analytics')
export class AnalyticsController {

  constructor(
    private readonly analyticsService: AnalyticsService
  ) {}

  @Get()
  async getAnalytics() {
    return this.analyticsService.getAnalytics();
  }
}