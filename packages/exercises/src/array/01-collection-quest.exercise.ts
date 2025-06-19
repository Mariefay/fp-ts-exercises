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
  throw new Error('Not implemented');
};
