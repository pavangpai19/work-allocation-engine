import { Controller, Get, Post, Body } from '@nestjs/common';
import { AllocationsService } from './allocations.service';
import { AnalyticsService } from './analytics/analytics.service';

@Controller('allocations')
export class AllocationsController {
  constructor(
  private readonly allocationsService: AllocationsService,
  private readonly analyticsService: AnalyticsService,
) {}
  @Get('analytics')
  async getAnalytics() {
  return this.analyticsService.getAnalytics();
}

  @Post()
  async create(@Body() body: any) {
    return this.allocationsService.create(body);
  }
}