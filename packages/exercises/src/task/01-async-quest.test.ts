import { fetchQuestData } from './01-async-quest.exercise';

describe('fetchQuestData', () => {
  it('fetches quest data successfully', async () => {
    const questId = 'dragon-slayer';
    const result = await fetchQuestData(questId)();
    
    expect(result).toEqual({
      treasures: ['Golden Sword', 'Magic Shield'],
      experience: 1000,
    });
  });

  it('handles different quest IDs', async () => {
    const questId = 'treasure-hunt';
    const result = await fetchQuestData(questId)();
    
    expect(result.treasures).toContain('Ancient Coin');
    expect(result.experience).toBeGreaterThan(0);
  });
});
