import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { ExerciseModule } from './exercise/exercise.module';
import { SessionModule } from './session/session.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    PrismaModule,
    ExerciseModule,
    SessionModule,
    ProgressModule,
  ],
})
export class AppModule {}
