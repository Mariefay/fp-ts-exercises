import { map, filter, reduce } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';


interface MagicalItem {
  name: string;
  power: number;
  type: 'weapon' | 'potion' | 'artifact';
  rarity: 'common' | 'rare' | 'legendary';
}

const processLoot = (
  items: MagicalItem[]
): { totalPower: number; legendaryCount: number } => {};

describe('processLoot', () => {
  const magicalItems: MagicalItem[] = [
    { name: 'Iron Sword', power: 25, type: 'weapon', rarity: 'common' },
    { name: 'Health Potion', power: 75, type: 'potion', rarity: 'rare' },
    { name: 'Dragon Scale', power: 150, type: 'artifact', rarity: 'legendary' },
    { name: 'Magic Ring', power: 100, type: 'artifact', rarity: 'legendary' },
    { name: 'Rusty Dagger', power: 15, type: 'weapon', rarity: 'common' },
  ];

  it('processes magical loot correctly', () => {
    const result = processLoot(magicalItems);

    expect(result).toEqual({
      totalPower: 325, // 75 + 150 + 100
      legendaryCount: 2, // Dragon Scale + Magic Ring
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
