import { Option, some, none, getOrElse } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

export const getAddressString = (addressOption: Option<string>): string => {
  return pipe(
    addressOption,
    getOrElse(() => 'No address provided')
  );
};
