import { Module } from '@nestjs/common';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SessionResolver, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
