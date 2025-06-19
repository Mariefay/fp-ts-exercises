import { Either, left, right, fold } from 'fp-ts/Either';
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
  if (pathName === 'dark_cave' && !hasKey) {
    return left({
      type: 'BLOCKED_PATH',
      message: 'The dark cave is locked and you need a key!',
    });
  }

  if (pathName === 'treasure_room' && goldAmount < 100) {
    return left({
      type: 'INSUFFICIENT_GOLD',
      message: 'You need at least 100 gold to enter the treasure room!',
    });
  }

  if (pathName === 'monster_lair') {
    return left({
      type: 'MONSTER_ENCOUNTER',
      message: 'A fierce monster blocks your path!',
    });
  }

  const treasures: Record<string, Treasure> = {
    dark_cave: { name: 'Ancient Gem', value: 500 },
    treasure_room: { name: 'Golden Crown', value: 1000 },
    forest_path: { name: 'Silver Coin', value: 50 },
  };

  return right(
    treasures[pathName] || { name: 'Mysterious Artifact', value: 100 }
  );
};

export const formatResult = (
  result: Either<AdventureError, Treasure>
): string => {
  return pipe(
    result,
    fold(
      (error: AdventureError) => `Adventure failed: ${error.message}`,
      (treasure: Treasure) =>
        `Found treasure: ${treasure.name} worth ${treasure.value} gold!`
    )
  );
};

describe('explorePath', () => {
  it('blocks dark cave without key', () => {
    const result = explorePath('dark_cave', false, 200);

    expect(result).toEqual(
      left({
        type: 'BLOCKED_PATH',
        message: 'The dark cave is locked and you need a key!',
      })
    );
  });

  it('allows dark cave with key', () => {
    const result = explorePath('dark_cave', true, 200);

    expect(result).toEqual(right({ name: 'Ancient Gem', value: 500 }));
  });

  it('blocks treasure room without enough gold', () => {
    const result = explorePath('treasure_room', true, 50);

    expect(result).toEqual(
      left({
        type: 'INSUFFICIENT_GOLD',
        message: 'You need at least 100 gold to enter the treasure room!',
      })
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
    const error: Either<AdventureError, Treasure> = left({
      type: 'BLOCKED_PATH',
      message: 'Path is blocked!',
    });
    const result = formatResult(error);

    expect(result).toBe('Adventure failed: Path is blocked!');
  });
});
