import {
  ReaderTaskEither,
  ask,
  right,
  chain,
  fromTaskEither,
} from 'fp-ts/ReaderTaskEither';
import { left as eitherLeft, right as eitherRight } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';


interface GameConfig {
  playerLevel: number;
  difficulty: 'easy' | 'medium' | 'hard';
  apiKey: string;
}

interface AdventureError {
  type: 'INSUFFICIENT_LEVEL' | 'API_ERROR' | 'QUEST_FAILED';
  message: string;
}

interface Quest {
  id: string;
  name: string;
  requiredLevel: number;
  reward: number;
}

interface QuestResult {
  questId: string;
  experience: number;
  treasure: string;
}

export const validatePlayerLevel = (
  quest: Quest
): ReaderTaskEither<GameConfig, AdventureError, Quest> => {
  return pipe(
    ask<GameConfig>(),
    chain((config) =>
      fromTaskEither(() =>
        Promise.resolve(
          config.playerLevel < quest.requiredLevel
            ? eitherLeft({
                type: 'INSUFFICIENT_LEVEL',
                message: `Need level ${quest.requiredLevel}, current level ${config.playerLevel}`,
              } as AdventureError)
            : eitherRight(quest)
        )
      )
    )
  );
};

export const completeQuest = (
  quest: Quest
): ReaderTaskEither<GameConfig, AdventureError, QuestResult> => {
  return pipe(
    ask<GameConfig>(),
    chain((config) =>
      fromTaskEither(() => {
        const successRate =
          config.difficulty === 'easy'
            ? 0.9
            : config.difficulty === 'medium'
              ? 0.7
              : 0.5;

        return Promise.resolve(
          Math.random() > successRate
            ? eitherLeft({
                type: 'QUEST_FAILED',
                message: 'Quest failed due to unexpected challenges',
              } as AdventureError)
            : eitherRight({
                questId: quest.id,
                experience: quest.reward,
                treasure: 'Ancient Artifact',
              })
        );
      })
    )
  );
};

export const startAdventure = (
  quest: Quest
): ReaderTaskEither<GameConfig, AdventureError, QuestResult> => {
  return pipe(validatePlayerLevel(quest), chain(completeQuest));
};

describe('ReaderTaskEither exercises', () => {
  const config: GameConfig = {
    playerLevel: 10,
    difficulty: 'medium',
    apiKey: 'test-key',
  };

  const quest: Quest = {
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
