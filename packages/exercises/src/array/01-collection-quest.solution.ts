import { map, filter, reduce } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

interface MagicalItem {
  name: string;
  power: number;
  type: 'weapon' | 'potion' | 'artifact';
  rarity: 'common' | 'rare' | 'legendary';
}

export const processLoot = (
  items: MagicalItem[]
): { totalPower: number; legendaryCount: number } => {
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
