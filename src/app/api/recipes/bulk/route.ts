import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RecipeInput {
  name: string;
  cookingStyle: string;
  ingredients: string;
  methodSteps: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  imageUrl: string;
}

export async function POST(request: Request) {
  try {
    const recipes = await request.json() as RecipeInput[];
    console.log('Received recipes:', recipes);
    
    const formattedRecipes = recipes.map(recipe => ({
      name: recipe.name,
      cookingStyle: recipe.cookingStyle.toUpperCase(),
      ingredients: recipe.ingredients.split(';').map(i => i.trim()),
      methodSteps: recipe.methodSteps.split('.').filter(step => step.trim()).map(step => step.trim()),
      prepTime: parseInt(recipe.prepTime.replace(' mins', '')),
      cookTime: parseInt(recipe.cookTime.replace(' mins', '')),
      servings: parseInt(recipe.servings),
      imageUrl: recipe.imageUrl === 'N/A' ? null : recipe.imageUrl,
      rating: 0,
      ratingCount: 0
    }));

    console.log('Formatted recipes:', formattedRecipes);

    const result = await prisma.recipe.createMany({
      data: formattedRecipes
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully imported ${result.count} recipes` 
    });
  } catch (error) {
    console.error('Error importing recipes:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to import recipes',
        details: error
      },
      { status: 500 }
    );
  }
} 