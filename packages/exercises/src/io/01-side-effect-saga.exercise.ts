import { IO } from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';

let gameState = {
  score: 0,
  lives: 3,
  level: 1,
};

export const logMessage = (message: string): IO<void> => {
  throw new Error('Not implemented');
};
