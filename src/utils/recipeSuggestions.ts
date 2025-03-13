interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  isPantryStaple: boolean;
}

interface Recipe {
  id: string;
  name: string;
  cookingStyle: string;
  ingredients: Ingredient[];
  prepTime: number;
  cookTime: number;
}

export function findRecipeSuggestions(
  currentRecipe: Recipe,
  allRecipes: Recipe[],
  maxSuggestions: number = 3
): Recipe[] {
  // Filter out the current recipe
  const otherRecipes = allRecipes.filter(recipe => recipe.id !== currentRecipe.id);

  // Get non-pantry ingredients from current recipe
  const currentIngredients = new Set(
    currentRecipe.ingredients
      .filter(ing => !ing.isPantryStaple)
      .map(ing => ing.name.toLowerCase())
  );

  // Calculate similarity scores for each recipe
  const recipesWithScores = otherRecipes.map(recipe => {
    const recipeIngredients = new Set(
      recipe.ingredients
        .filter(ing => !ing.isPantryStaple)
        .map(ing => ing.name.toLowerCase())
    );

    // Calculate shared ingredients
    const sharedIngredients = new Set(
      [...currentIngredients].filter(x => recipeIngredients.has(x))
    );

    // Calculate unique additional ingredients needed
    const additionalIngredients = new Set(
      [...recipeIngredients].filter(x => !currentIngredients.has(x))
    );

    return {
      recipe,
      score: {
        shared: sharedIngredients.size,
        additional: additionalIngredients.size,
      }
    };
  });

  // Sort recipes by most shared ingredients and fewest additional ingredients
  return recipesWithScores
    .sort((a, b) => {
      if (a.score.shared !== b.score.shared) {
        return b.score.shared - a.score.shared; // More shared ingredients is better
      }
      return a.score.additional - b.score.additional; // Fewer additional ingredients is better
    })
    .slice(0, maxSuggestions)
    .map(item => item.recipe);
} 