import { Reader, ask, map } from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function';


interface GameConfig {
  playerName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  secretKey: string;
}

interface QuestResult {
  message: string;
  reward: number;
}

export const getPlayerGreeting = (): Reader<GameConfig, string> => {
  return pipe(
    ask<GameConfig>(),
    map((config) => `Welcome, ${config.playerName}!`)
  );
};

export const calculateReward = (): Reader<GameConfig, number> => {
  return pipe(
    ask<GameConfig>(),
    map((config) => {
      switch (config.difficulty) {
        case 'easy':
          return 100;
        case 'medium':
          return 200;
        case 'hard':
          return 300;
        default:
          return 100;
      }
    })
  );
};

export const completeQuest = (): Reader<GameConfig, QuestResult> => {
  return pipe(
    ask<GameConfig>(),
    map((config) => {
      const greeting = `Welcome, ${config.playerName}!`;
      const reward =
        config.difficulty === 'easy'
          ? 100
          : config.difficulty === 'medium'
            ? 200
            : 300;
      return {
        message: greeting,
        reward,
      };
    })
  );
};

describe('Reader exercises', () => {
  const config: GameConfig = {
    playerName: 'Hero',
    difficulty: 'medium',
    secretKey: 'abc123',
  };

  it('gets player greeting', () => {
    const greeting = getPlayerGreeting()(config);
    expect(greeting).toBe('Welcome, Hero!');
  });

  it('calculates reward based on difficulty', () => {
    const reward = calculateReward()(config);
    expect(reward).toBe(200);
  });

  it('completes quest with combined result', () => {
    const result = completeQuest()(config);
    expect(result).toEqual({
      message: 'Welcome, Hero!',
      reward: 200,
    });
  });
});
