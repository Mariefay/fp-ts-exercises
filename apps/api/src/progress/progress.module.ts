import { Module } from '@nestjs/common';
import { ProgressResolver } from './progress.resolver.js';
import { ProgressService } from './progress.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { SessionModule } from '../session/session.module.js';

@Module({
  imports: [PrismaModule, SessionModule],
  providers: [ProgressResolver, ProgressService],
})
export class ProgressModule {}
