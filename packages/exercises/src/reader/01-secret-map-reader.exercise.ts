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

export const getSecretValue = (key: string): Reader<any, any> => {
  throw new Error('Not implemented');
};
