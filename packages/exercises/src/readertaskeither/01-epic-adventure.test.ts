import { right } from 'fp-ts/Either';

import { validatePlayerLevel, startAdventure } from './01-epic-adventure.exercise';

describe('ReaderTaskEither exercises', () => {
  const config = {
    playerLevel: 10,
    difficulty: 'medium' as const,
    apiKey: 'test-key',
  };

  const quest = {
    id: 'QUEST001',
    name: 'Dragon Slayer',
    requiredLevel: 5,
    reward: 1000,
  };

  it('validates player level successfully', async () => {
    const result = await validatePlayerLevel(quest)(config)();
    expect(result).toEqual(right(quest));
  });

  it('rejects insufficient level', async () => {
    const lowLevelConfig = { ...config, playerLevel: 3 };
    const result = await validatePlayerLevel(quest)(lowLevelConfig)();

    expect(result._tag).toBe('Left');
    if (result._tag === 'Left') {
      expect(result.left.type).toBe('INSUFFICIENT_LEVEL');
    }
  });

  it('completes adventure successfully', async () => {
    const result = await startAdventure(quest)(config)();

    if (result._tag === 'Right') {
      expect(result.right.questId).toBe('QUEST001');
      expect(result.right.experience).toBe(1000);
    }
  });
});
