import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SessionService } from './session.service.js';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => String)
  async createSession(): Promise<string> {
    return await this.sessionService.createSession();
  }

  @Query(() => Boolean)
  async validateSession(@Args('sessionId') sessionId: string): Promise<boolean> {
    return await this.sessionService.validateSession(sessionId);
  }
}
