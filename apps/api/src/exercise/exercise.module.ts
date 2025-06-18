import { Module } from '@nestjs/common';
import { ExerciseResolver } from './exercise.resolver.js';
import { ExerciseService } from './exercise.service.js';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper.js';
import { ExerciseValidationService } from './exercise-validation.service.js';
import { ExerciseHealthResolver } from './exercise-health.resolver.js';

@Module({
  providers: [ExerciseResolver, ExerciseService, ExerciseDiscoveryWrapper, ExerciseValidationService, ExerciseHealthResolver],
  exports: [ExerciseValidationService, ExerciseDiscoveryWrapper],
})
export class ExerciseModule {}
