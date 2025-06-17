import { map, filter, reduce } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { expect, describe, it } from 'vitest';

interface MagicalItem {
  name: string;
  power: number;
  type: 'weapon' | 'potion' | 'artifact';
  rarity: 'common' | 'rare' | 'legendary';
}

export const processLoot = (items: MagicalItem[]): { totalPower: number; legendaryCount: number } => {
  const powerfulItems = pipe(
    items,
    filter((item: MagicalItem) => item.power > 50)
  );

  const totalPower = pipe(
    powerfulItems,
    map((item: MagicalItem) => item.power),
    reduce(0, (acc: number, power: number) => acc + power)
  );

  const legendaryCount = pipe(
    powerfulItems,
    filter((item: MagicalItem) => item.rarity === 'legendary')
  ).length;

  return { totalPower, legendaryCount };
};

describe('processLoot', () => {
  const magicalItems: MagicalItem[] = [
    { name: 'Iron Sword', power: 25, type: 'weapon', rarity: 'common' },
    { name: 'Health Potion', power: 75, type: 'potion', rarity: 'rare' },
    { name: 'Dragon Scale', power: 150, type: 'artifact', rarity: 'legendary' },
    { name: 'Magic Ring', power: 100, type: 'artifact', rarity: 'legendary' },
    { name: 'Rusty Dagger', power: 15, type: 'weapon', rarity: 'common' }
  ];

  it('processes magical loot correctly', () => {
    const result = processLoot(magicalItems);
    
    expect(result).toEqual({
      totalPower: 325,
      legendaryCount: 2
    });
  });

  it('handles empty array', () => {
    const result = processLoot([]);
    
    expect(result).toEqual({
      totalPower: 0,
      legendaryCount: 0
    });
  });
});
