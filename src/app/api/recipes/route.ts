import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/recipes
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        cookingStyle: true,
        ingredients: true,
        methodSteps: true,
        prepTime: true,
        cookTime: true,
        servings: true,
        imageUrl: true,
        rating: true,
        ratingCount: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }
}

// POST /api/recipes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        cookingStyle: body.cookingStyle,
        ingredients: body.ingredients,
        methodSteps: body.methodSteps,
        prepTime: body.prepTime,
        cookTime: body.cookTime,
        servings: body.servings,
        imageUrl: body.imageUrl,
        rating: 0,
        ratingCount: 0
      }
    })
    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 })
  }
} 