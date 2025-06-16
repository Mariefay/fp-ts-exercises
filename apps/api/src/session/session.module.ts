import { Module } from '@nestjs/common';
import { SessionResolver } from './session.resolver.js';
import { SessionService } from './session.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [SessionResolver, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
