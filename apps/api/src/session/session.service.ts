import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(): Promise<string> {
    const sessionId = uuidv4();
    
    await this.prisma.session.create({
      data: {
        id: sessionId,
      },
    });

    return sessionId;
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    return !!session;
  }

  async getOrCreateSession(sessionId?: string): Promise<string> {
    if (sessionId && await this.validateSession(sessionId)) {
      return sessionId;
    }
    
    return await this.createSession();
  }
}
