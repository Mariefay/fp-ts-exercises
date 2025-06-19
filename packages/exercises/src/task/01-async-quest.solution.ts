import { Task } from 'fp-ts/Task';

interface QuestData {
  treasures: string[];
  experience: number;
}

export const fetchTreasures = (): Task<string[]> => {
  return () => Promise.resolve(['Gold Coin', 'Magic Gem', 'Ancient Scroll']);
};

export const calculateExperience = (treasures: string[]): Task<number> => {
  return () => Promise.resolve(treasures.length * 100);
};

export const completeQuest = (): Task<QuestData> => {
  return async () => {
    const treasures = await fetchTreasures()();
    const experience = await calculateExperience(treasures)();
    return { treasures, experience };
  };
};
