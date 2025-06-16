import { split, join, map } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { expect, describe, it } from 'vitest';


const formatAdventureMessage = (message: string): string => {
};

const capitalizeWord = (word: string): string => {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

describe('formatAdventureMessage', () => {
  it('formats adventure message correctly', () => {
    const message = 'the brave knight defeated the dragon';
    const result = formatAdventureMessage(message);
    
    expect(result).toBe('🗡️ The Brave Knight Defeated The Dragon ⚔️');
  });

  it('handles single word', () => {
    const message = 'victory';
    const result = formatAdventureMessage(message);
    
    expect(result).toBe('🗡️ Victory ⚔️');
  });

  it('handles empty string', () => {
    const message = '';
    const result = formatAdventureMessage(message);
    
    expect(result).toBe('🗡️  ⚔️');
  });
});
