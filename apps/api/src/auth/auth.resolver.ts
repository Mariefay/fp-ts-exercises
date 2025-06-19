import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async registerUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<string> {
    const result = await this.authService.register({ email, password, name });
    return JSON.stringify(result);
  }

  @Mutation(() => String)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.authService.login({ email, password });
    return JSON.stringify(result);
  }

  @Mutation(() => Boolean)
  async logoutUser(): Promise<boolean> {
    return true;
  }
}
