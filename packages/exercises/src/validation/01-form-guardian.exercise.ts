import { Either, left, right, map, mapLeft, fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { expect, describe, it } from 'vitest';

interface ValidationError {
  field: string;
  message: string;
}

interface UserForm {
  username: string;
  email: string;
  age: number;
}

const validateUsername = (
  username: string
): Either<ValidationError, string> => {
  if (username.length < 3) {
    return left({
      field: 'username',
      message: 'Username must be at least 3 characters long',
    });
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return left({
      field: 'username',
      message: 'Username can only contain letters and numbers',
    });
  }
  return right(username);
};

const validateEmail = (email: string): Either<ValidationError, string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return left({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }
  return right(email);
};

const validateAge = (age: number): Either<ValidationError, number> => {
  if (age < 13) {
    return left({ field: 'age', message: 'You must be at least 13 years old' });
  }
  if (age > 120) {
    return left({ field: 'age', message: 'Please enter a valid age' });
  }
  return right(age);
};

const validateForm = (form: UserForm): Either<ValidationError[], UserForm> => {
  const usernameResult = validateUsername(form.username);
  const emailResult = validateEmail(form.email);
  const ageResult = validateAge(form.age);

  const errors: ValidationError[] = [];

  if (usernameResult._tag === 'Left') errors.push(usernameResult.left);
  if (emailResult._tag === 'Left') errors.push(emailResult.left);
  if (ageResult._tag === 'Left') errors.push(ageResult.left);

  if (errors.length > 0) {
    return left(errors);
  }

  return right(form);
};

describe('Form validation', () => {
  it('validates valid form', () => {
    const form: UserForm = {
      username: 'hero123',
      email: 'hero@example.com',
      age: 25,
    };

    const result = validateForm(form);
    expect(result).toEqual(right(form));
  });

  it('collects multiple validation errors', () => {
    const form: UserForm = {
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

  it('validates username correctly', () => {
    expect(validateUsername('ab')).toEqual(
      left({
        field: 'username',
        message: 'Username must be at least 3 characters long',
      })
    );

    expect(validateUsername('user@123')).toEqual(
      left({
        field: 'username',
        message: 'Username can only contain letters and numbers',
      })
    );

    expect(validateUsername('hero123')).toEqual(right('hero123'));
  });
});
