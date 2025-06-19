import { pipe } from 'fp-ts/function';

interface Player {
  name: string;
  stats: PlayerStats;
  inventory: Inventory;
}

interface PlayerStats {
  level: number;
  health: number;
  mana: number;
}

interface Inventory {
  gold: number;
  items: Item[];
}

interface Item {
  id: string;
  name: string;
  quantity: number;
}

export const levelLens = {
  get: (player: Player) => player.stats.level,
  set:
    (level: number) =>
    (player: Player): Player => ({
      ...player,
      stats: { ...player.stats, level },
    }),
  modify:
    (f: (level: number) => number) =>
    (player: Player): Player => ({
      ...player,
      stats: { ...player.stats, level: f(player.stats.level) },
    }),
};

export const healthLens = {
  get: (player: Player) => player.stats.health,
  set:
    (health: number) =>
    (player: Player): Player => ({
      ...player,
      stats: { ...player.stats, health },
    }),
  modify:
    (f: (health: number) => number) =>
    (player: Player): Player => ({
      ...player,
      stats: { ...player.stats, health: f(player.stats.health) },
    }),
};

export const goldLens = {
  get: (player: Player) => player.inventory.gold,
  set:
    (gold: number) =>
    (player: Player): Player => ({
      ...player,
      inventory: { ...player.inventory, gold },
    }),
  modify:
    (f: (gold: number) => number) =>
    (player: Player): Player => ({
      ...player,
      inventory: { ...player.inventory, gold: f(player.inventory.gold) },
    }),
};

export const levelUpPlayer = (player: Player): Player => {
  throw new Error('Not implemented');
};

export const addGold =
  (amount: number) =>
  (player: Player): Player => {
    throw new Error('Not implemented');
  };

export const healPlayer =
  (amount: number) =>
  (player: Player): Player => {
    throw new Error('Not implemented');
  };
