import { IO, map, chain } from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { expect, describe, it } from 'vitest';

export const getCurrentTime: IO<Date> = () => new Date();

export const getRandomNumber: IO<number> = () => Math.random();

export const logMessage = (message: string): IO<void> => () => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export const generateId: IO<string> = pipe(
  getRandomNumber,
  map(num => Math.floor(num * 1000000).toString())
);

export const createLogEntry = (message: string): IO<string> => {
  return pipe(
    getCurrentTime,
    map(time => `${time.toISOString()}: ${message}`)
  );
};

export const performLogging = (message: string): IO<void> => {
  return pipe(
    createLogEntry(message),
    chain(logMessage)
  );
};

describe('IO exercises', () => {
  it('generates random ID', () => {
    const id1 = generateId();
    const id2 = generateId();
    
    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
    expect(id1).not.toBe(id2);
  });

  it('creates log entry', () => {
    const logEntry = createLogEntry('Test message');
    expect(logEntry).toContain('Test message');
    expect(logEntry).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('performs logging without throwing', () => {
    expect(() => performLogging('Test log')).not.toThrow();
  });
});
