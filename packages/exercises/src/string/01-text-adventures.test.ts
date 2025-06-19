import { formatAdventureText } from './01-text-adventures.exercise';

describe('formatAdventureText', () => {
  it('formats adventure text correctly', () => {
    const input = 'the brave knight fought the dragon';
    const result = formatAdventureText(input);
    
    expect(result).toBe('The Brave Knight Fought The Dragon');
  });

  it('handles single word', () => {
    const input = 'hero';
    const result = formatAdventureText(input);
    
    expect(result).toBe('Hero');
  });

  it('handles empty string', () => {
    const input = '';
    const result = formatAdventureText(input);
    
    expect(result).toBe('');
  });
});
