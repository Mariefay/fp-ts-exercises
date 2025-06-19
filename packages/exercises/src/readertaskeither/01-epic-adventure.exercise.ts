import {
  ReaderTaskEither,
  ask,
  left,
  right,
  chain,
  fromTaskEither,
} from 'fp-ts/ReaderTaskEither';
import { TaskEither } from 'fp-ts/TaskEither';
import { Either, left as eitherLeft, right as eitherRight } from 'fp-ts/Either';
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
  throw new Error('Not implemented');
};

export const completeQuest = (
  quest: Quest
): ReaderTaskEither<GameConfig, AdventureError, QuestResult> => {
  throw new Error('Not implemented');
};

export const startAdventure = (
  quest: Quest
): ReaderTaskEither<GameConfig, AdventureError, QuestResult> => {
  throw new Error('Not implemented');
};
