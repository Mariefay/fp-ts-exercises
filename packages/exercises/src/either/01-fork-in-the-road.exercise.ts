// Either: Fork in the Road
// Goal: Learn to handle errors gracefully using Either type for adventure path exploration
// Concept: Either represents values with two possibilities - Left for errors, Right for success values
// Difficulty: medium
// Time: 20
// Theme: adventure
// 1. Use left() to create error cases when conditions aren't met
// 2. Use right() to create success cases with treasure data
// 3. Use fold() to transform Either values into user-friendly messages
// Success criteria:
// - Handle blocked paths when missing required items
// - Return appropriate treasures for valid paths
// - Format results into readable adventure messages

import { Either, left, right, map, mapLeft, fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

interface AdventureError {
  type: 'BLOCKED_PATH' | 'INSUFFICIENT_GOLD' | 'MONSTER_ENCOUNTER';
  message: string;
}

interface Treasure {
  name: string;
  value: number;
}

export const explorePath = (
  pathName: string,
  hasKey: boolean,
  goldAmount: number
): Either<AdventureError, Treasure> => {
  throw new Error('Not implemented');
};

export const formatResult = (result: Either<AdventureError, Treasure>): string => {
  throw new Error('Not implemented');
};
