import { Option, some, none, fold } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

interface User {
  id: number;
  name: string;
  email?: string;
}

export const getUserEmail = (user: Option<User>): string =>
  pipe(
    user,
    fold(
      () => 'User email not available',
      (u) => u.email || 'User email not available'
    )
  );
