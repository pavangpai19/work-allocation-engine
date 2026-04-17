import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { DecisionEngineService } from './decision-engine.service';
import { OverviewService } from './overview/overview.service';
import { OverviewController } from './overview/overview.controller';

@Module({
  imports: [SupabaseModule],
  controllers: [OverviewController],
  providers: [
    DecisionEngineService,
    OverviewService
  ],
  exports: [DecisionEngineService],
})
export class IntelligenceModule {}