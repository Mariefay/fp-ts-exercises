import { map } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

export const formatAdventureText = (message: string): string => {
  throw new Error('Not implemented');
};

const capitalizeWord = (word: string): string => {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
