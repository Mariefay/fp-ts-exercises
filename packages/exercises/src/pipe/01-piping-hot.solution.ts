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

export const cookRecipe = (recipe: Recipe): Recipe => {
  return pipe(recipe, addSpices, preheatOven, setCookingTime(45));
};
