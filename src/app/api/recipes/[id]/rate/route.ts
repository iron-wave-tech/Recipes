import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { isLike } = await request.json()
    
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id }
    })

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    // Update rating
    const updatedRecipe = await prisma.recipe.update({
      where: { id: params.id },
      data: {
        rating: isLike ? recipe.rating + 1 : recipe.rating - 1,
        ratingCount: recipe.ratingCount + 1
      }
    })

    return NextResponse.json(updatedRecipe)
  } catch (error) {
    console.error('Error rating recipe:', error)
    return NextResponse.json(
      { error: 'Failed to rate recipe' },
      { status: 500 }
    )
  }
} 