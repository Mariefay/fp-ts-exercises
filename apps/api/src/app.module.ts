import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module.js';
import { ExerciseModule } from './exercise/exercise.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProgressModule } from './progress/progress.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    ExerciseModule,
    AuthModule,
    ProgressModule,
  ],
})
export class AppModule {}
