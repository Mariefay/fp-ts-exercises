import { pipe } from 'fp-ts/function';
import { test, expect, describe, it } from '@jest/globals';

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

const levelLens = {
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

const healthLens = {
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

const goldLens = {
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

const levelUpPlayer = (player: Player): Player => {
  return pipe(
    player,
    levelLens.modify((level) => level + 1),
    healthLens.set(100)
  );
};

const addGold =
  (amount: number) =>
  (player: Player): Player => {
    return goldLens.modify((gold) => gold + amount)(player);
  };

const healPlayer =
  (amount: number) =>
  (player: Player): Player => {
    return healthLens.modify((health) => Math.min(health + amount, 100))(
      player
    );
  };

describe('Lens exercises', () => {
  const player: Player = {
    name: 'Hero',
    stats: {
      level: 5,
      health: 80,
      mana: 50,
    },
    inventory: {
      gold: 100,
      items: [],
    },
  };

  it('levels up player correctly', () => {
    const leveledUp = levelUpPlayer(player);

    expect(leveledUp.stats.level).toBe(6);
    expect(leveledUp.stats.health).toBe(100);
    expect(leveledUp.name).toBe('Hero');
  });

  it('adds gold correctly', () => {
    const withGold = addGold(50)(player);

    expect(withGold.inventory.gold).toBe(150);
    expect(withGold.stats.level).toBe(5);
  });

  it('heals player correctly', () => {
    const damagedPlayer = { ...player, stats: { ...player.stats, health: 30 } };
    const healed = healPlayer(40)(damagedPlayer);

    expect(healed.stats.health).toBe(70);
  });

  it('caps healing at 100', () => {
    const healed = healPlayer(50)(player);

    expect(healed.stats.health).toBe(100);
  });
});
