import { Either, left, right, map, mapLeft, fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

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

export const validateForm = (form: UserForm): Either<ValidationError[], UserForm> => {
  throw new Error('Not implemented');
};
