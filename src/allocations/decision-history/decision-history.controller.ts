import { Controller, Get, Param } from '@nestjs/common';
import { DecisionHistoryService } from './decision-history.service';

@Controller('allocations/decisions')
export class DecisionHistoryController {

  constructor(
    private readonly decisionHistoryService: DecisionHistoryService
  ) {}

  @Get()
  async getAllDecisions() {
    return this.decisionHistoryService.getAllDecisions();
  }

  @Get(':project_id')
  async getDecisionsByProject(
    @Param('project_id') project_id: string
  ) {
    return this.decisionHistoryService.getDecisionsByProject(project_id);
  }

}