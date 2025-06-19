import { Option, some, none, toNullable } from 'fp-ts/Option';

interface User {
  id: number;
  name: string;
  address?: string;
}

export const getUserAddressAsNullable = (
  userOption: Option<User>
): string | null => {
  const user = toNullable(userOption);
  return user?.address || null;
};
