import { Module } from '@nestjs/common';
import { ProgressResolver } from './progress.resolver';
import { ProgressService } from './progress.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [PrismaModule, SessionModule],
  providers: [ProgressResolver, ProgressService],
})
export class ProgressModule {}
