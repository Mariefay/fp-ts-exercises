import { Task } from 'fp-ts/Task';
import { pipe } from 'fp-ts/function';


interface QuestData {
  treasures: string[];
  experience: number;
}

const fetchTreasures = (): Task<string[]> => {
  return () => Promise.resolve(['Gold Coin', 'Magic Gem', 'Ancient Scroll']);
};

const calculateExperience = (treasures: string[]): Task<number> => {
  return () => Promise.resolve(treasures.length * 100);
};

const completeQuest = (): Task<QuestData> => {
  return async () => {
    const treasures = await fetchTreasures()();
    const experience = await calculateExperience(treasures)();
    return { treasures, experience };
  };
};

describe('Task exercises', () => {
  it('fetches treasures', async () => {
    const treasures = await fetchTreasures()();
    expect(treasures).toEqual(['Gold Coin', 'Magic Gem', 'Ancient Scroll']);
  });

  it('calculates experience', async () => {
    const experience = await calculateExperience(['item1', 'item2'])();
    expect(experience).toBe(200);
  });

  it('completes quest', async () => {
    const result = await completeQuest()();
    expect(result).toEqual({
      treasures: ['Gold Coin', 'Magic Gem', 'Ancient Scroll'],
      experience: 300,
    });
  });
});
