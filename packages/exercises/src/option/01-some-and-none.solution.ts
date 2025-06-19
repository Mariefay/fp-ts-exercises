import { Option, some, none } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
}

export const getUserById = (users: User[], id: number): Option<User> => {
  const user = users.find((u) => u.id === id);
  return user ? some(user) : none;
};
