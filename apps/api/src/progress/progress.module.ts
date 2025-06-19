import { Module } from '@nestjs/common';
import { ProgressResolver } from './progress.resolver.js';
import { ProgressService } from './progress.service.js';
import { ProgressDashboardResolver } from './progress-dashboard.resolver.js';
import { ProgressDashboardService } from './progress-dashboard.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { ExerciseModule } from '../exercise/exercise.module.js';

@Module({
  imports: [PrismaModule, AuthModule, ExerciseModule],
  providers: [ProgressResolver, ProgressService, ProgressDashboardResolver, ProgressDashboardService],
})
export class ProgressModule {}
