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
