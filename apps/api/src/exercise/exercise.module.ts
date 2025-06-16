import { Module } from '@nestjs/common';
import { ExerciseResolver } from './exercise.resolver.js';
import { ExerciseService } from './exercise.service.js';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper.js';

@Module({
  providers: [ExerciseResolver, ExerciseService, ExerciseDiscoveryWrapper],
})
export class ExerciseModule {}
