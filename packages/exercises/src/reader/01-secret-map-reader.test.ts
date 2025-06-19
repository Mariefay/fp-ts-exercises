import { getSecretValue } from './01-secret-map-reader.exercise';

describe('getSecretValue', () => {
  it('reads secret value from environment', () => {
    const env = { secret: 'hidden-treasure' };
    const reader = getSecretValue('secret');
    const result = reader(env);
    
    expect(result).toBe('hidden-treasure');
  });

  it('handles missing keys', () => {
    const env = {};
    const reader = getSecretValue('missing');
    const result = reader(env);
    
    expect(result).toBeUndefined();
  });
});
