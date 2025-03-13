import React from 'react'
import Image from 'next/image'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

async function getRecipe(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { id }
  })
  
  if (!recipe) notFound()
  return recipe
}

export default async function RecipePage({ params }: PageProps) {
  const recipe = await getRecipe(params.id)
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <span>{recipe.cookingStyle}</span>
          <span className="mx-2">•</span>
          <span>Prep: {recipe.prepTime} mins</span>
          <span className="mx-2">•</span>
          <span>Cook: {recipe.cookTime} mins</span>
          <span className="mx-2">•</span>
          <span>Serves {recipe.servings}</span>
        </div>
        
        {recipe.image && (
          <div className="relative aspect-video mb-8">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>{ingredient.name}</span>
                <span className="text-gray-600">{ingredient.amount} {ingredient.unit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Method</h2>
          <ol className="space-y-4">
            {recipe.method.map((step: string, index: number) => (
              <li key={index} className="flex">
                <span className="font-semibold mr-4">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
} 