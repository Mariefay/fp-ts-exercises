import { Module } from '@nestjs/common';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper';

@Module({
  providers: [ExerciseResolver, ExerciseService, ExerciseDiscoveryWrapper],
})
export class ExerciseModule {}
