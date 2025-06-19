import { Option, some, none, toUndefined } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
}

export const getUserAsUndefined = (
  userOption: Option<User>
): User | undefined => {
  return toUndefined(userOption);
};
