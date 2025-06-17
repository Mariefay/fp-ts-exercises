
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
import { expect, describe, it } from 'vitest';

interface AdventureError {
  type: 'BLOCKED_PATH' | 'INSUFFICIENT_GOLD' | 'MONSTER_ENCOUNTER';
  message: string;
}

interface Treasure {
  name: string;
  value: number;
}

const explorePath = (pathName: string, hasKey: boolean, goldAmount: number): Either<AdventureError, Treasure> => {
  throw new Error('Not implemented');
};

const formatResult = (result: Either<AdventureError, Treasure>): string => {
  throw new Error('Not implemented');
};

describe('explorePath', () => {
  it('blocks dark cave without key', () => {
    const result = explorePath('dark_cave', false, 200);
    
    expect(result).toEqual(
      left({ type: 'BLOCKED_PATH', message: 'The dark cave is locked and you need a key!' })
    );
  });

  it('allows dark cave with key', () => {
    const result = explorePath('dark_cave', true, 200);
    
    expect(result).toEqual(
      right({ name: 'Ancient Gem', value: 500 })
    );
  });

  it('blocks treasure room without enough gold', () => {
    const result = explorePath('treasure_room', true, 50);
    
    expect(result).toEqual(
      left({ type: 'INSUFFICIENT_GOLD', message: 'You need at least 100 gold to enter the treasure room!' })
    );
  });
});

describe('formatResult', () => {
  it('formats success message', () => {
    const treasure = right({ name: 'Golden Crown', value: 1000 });
    const result = formatResult(treasure);
    
    expect(result).toBe('Found treasure: Golden Crown worth 1000 gold!');
  });

  it('formats error message', () => {
    const error: Either<AdventureError, Treasure> = left({ type: 'BLOCKED_PATH', message: 'Path is blocked!' });
    const result = formatResult(error);
    
    expect(result).toBe('Adventure failed: Path is blocked!');
  });
});
