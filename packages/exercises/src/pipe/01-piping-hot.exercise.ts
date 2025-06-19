import { pipe } from 'fp-ts/function';


interface Recipe {
  name: string;
  ingredients: string[];
  temperature: number;
  cookingTime: number;
}

const addSpices = (recipe: Recipe): Recipe => ({
  ...recipe,
  ingredients: [...recipe.ingredients, 'salt', 'pepper', 'herbs'],
});

const preheatOven = (recipe: Recipe): Recipe => ({
  ...recipe,
  temperature: 350,
});

const setCookingTime =
  (minutes: number) =>
  (recipe: Recipe): Recipe => ({
    ...recipe,
    cookingTime: minutes,
  });

const cookRecipe = (recipe: Recipe): Recipe => {};

describe('cookRecipe', () => {
  const baseRecipe: Recipe = {
    name: 'Roasted Vegetables',
    ingredients: ['carrots', 'potatoes', 'onions'],
    temperature: 0,
    cookingTime: 0,
  };

  it('transforms recipe through all cooking steps', () => {
    const result = cookRecipe(baseRecipe);

    expect(result).toEqual({
      name: 'Roasted Vegetables',
      ingredients: ['carrots', 'potatoes', 'onions', 'salt', 'pepper', 'herbs'],
      temperature: 350,
      cookingTime: 45,
    });
  });

  it('preserves original recipe name', () => {
    const result = cookRecipe(baseRecipe);
    expect(result.name).toBe('Roasted Vegetables');
  });
});
