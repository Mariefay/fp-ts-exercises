import { Module } from '@nestjs/common';
import { ProgressResolver } from './progress.resolver.js';
import { ProgressService } from './progress.service.js';
import { ProgressDashboardResolver } from './progress-dashboard.resolver.js';
import { ProgressDashboardService } from './progress-dashboard.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { SessionModule } from '../session/session.module.js';
import { ExerciseModule } from '../exercise/exercise.module.js';

@Module({
  imports: [PrismaModule, SessionModule, ExerciseModule],
  providers: [ProgressResolver, ProgressService, ProgressDashboardResolver, ProgressDashboardService],
})
export class ProgressModule {}
