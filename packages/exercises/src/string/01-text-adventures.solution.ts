import { map } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

const capitalizeWord = (word: string): string => {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formatAdventureMessage = (message: string): string => {
  const words = message.split(' ');
  const capitalizedWords = pipe(words, map(capitalizeWord));
  const formatted = capitalizedWords.join(' ');
  return `🗡️ ${formatted} ⚔️`;
};
