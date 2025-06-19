import { processLoot } from './01-collection-quest.exercise';

describe('processLoot', () => {
  const magicalItems = [
    { name: 'Iron Sword', power: 25, type: 'weapon', rarity: 'common' },
    { name: 'Health Potion', power: 75, type: 'potion', rarity: 'rare' },
    { name: 'Dragon Scale', power: 150, type: 'armor', rarity: 'legendary' },
    { name: 'Rusty Dagger', power: 15, type: 'weapon', rarity: 'common' },
  ];

  it('processes magical loot correctly', () => {
    const result = processLoot(magicalItems);

    expect(result).toEqual({
      totalPower: 265,
      legendaryCount: 1,
    });
  });

  it('handles empty array', () => {
    const result = processLoot([]);

    expect(result).toEqual({
      totalPower: 0,
      legendaryCount: 0,
    });
  });
});
