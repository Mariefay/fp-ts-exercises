import { levelUpPlayer, addGold, healPlayer } from './01-lens-crafting.exercise';

describe('Lens exercises', () => {
  const player = {
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
