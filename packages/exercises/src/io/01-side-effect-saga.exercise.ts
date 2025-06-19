import { IO } from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { test, expect, describe, it, beforeEach } from '@jest/globals';

let gameState = {
  score: 0,
  lives: 3,
  level: 1,
};

const addScore = (points: number): IO<void> => {
  return () => {
    gameState.score += points;
  };
};

const loseLife = (): IO<boolean> => {
  return () => {
    gameState.lives -= 1;
    return gameState.lives <= 0;
  };
};

const levelUp = (): IO<number> => {
  return () => {
    gameState.level += 1;
    return gameState.level;
  };
};

const resetGame = (): IO<void> => {
  return () => {
    gameState = { score: 0, lives: 3, level: 1 };
  };
};

describe('IO exercises', () => {
  beforeEach(() => {
    gameState = { score: 0, lives: 3, level: 1 };
  });

  it('adds score', () => {
    const addPoints = addScore(100);
    addPoints();
    expect(gameState.score).toBe(100);
  });

  it('loses life and detects game over', () => {
    gameState.lives = 1;
    const lose = loseLife();
    const gameOver = lose();
    expect(gameOver).toBe(true);
    expect(gameState.lives).toBe(0);
  });

  it('levels up', () => {
    const levelUpAction = levelUp();
    const newLevel = levelUpAction();
    expect(newLevel).toBe(2);
    expect(gameState.level).toBe(2);
  });

  it('resets game', () => {
    gameState = { score: 500, lives: 1, level: 5 };
    const reset = resetGame();
    reset();
    expect(gameState).toEqual({ score: 0, lives: 3, level: 1 });
  });
});
