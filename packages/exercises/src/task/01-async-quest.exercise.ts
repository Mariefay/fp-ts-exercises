import { Task } from 'fp-ts/Task';
import { pipe } from 'fp-ts/function';

interface QuestData {
  treasures: string[];
  experience: number;
}

export const fetchQuestData = (questId: string): Task<QuestData> => {
  throw new Error('Not implemented');
};
