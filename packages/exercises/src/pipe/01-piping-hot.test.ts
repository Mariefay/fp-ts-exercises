import { processNumbers } from './01-piping-hot.exercise';

describe('processNumbers', () => {
  it('processes numbers correctly', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = processNumbers(numbers);
    
    expect(result).toEqual([4, 16, 36]);
  });

  it('handles empty array', () => {
    const numbers: number[] = [];
    const result = processNumbers(numbers);
    
    expect(result).toEqual([]);
  });

  it('filters out odd numbers', () => {
    const numbers = [1, 3, 5];
    const result = processNumbers(numbers);
    
    expect(result).toEqual([]);
  });
});
