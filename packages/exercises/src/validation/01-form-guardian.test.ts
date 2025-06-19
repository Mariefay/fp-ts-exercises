import { right } from 'fp-ts/Either';

import { validateForm } from './01-form-guardian.exercise';

describe('Form validation', () => {
  it('validates valid form', () => {
    const form = {
      username: 'hero123',
      email: 'hero@example.com',
      age: 25,
    };
    const result = validateForm(form);
    expect(result).toEqual(right(form));
  });

  it('collects multiple validation errors', () => {
    const form = {
      username: 'ab',
      email: 'invalid-email',
      age: 10,
    };
    const result = validateForm(form);
    expect(result._tag).toBe('Left');
    if (result._tag === 'Left') {
      expect(result.left).toHaveLength(3);
    }
  });
});
