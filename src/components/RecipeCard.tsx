'use client'

import React, { useState } from 'react'
import RecipeModal from './RecipeModal'

interface Recipe {
  id: string
  name: string
  cookingStyle: string
  ingredients: string[]
  methodSteps: string[]
  prepTime: number
  cookTime: number
  servings: number
  imageUrl: string | null
  rating: number
  ratingCount: number
}

interface RecipeCardProps {
  recipe: Recipe
  onRate?: (recipeId: string, isLike: boolean) => void
}

export default function RecipeCard({
  recipe,
  onRate
}: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime
  const [isRating, setIsRating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRate = async (isLike: boolean) => {
    if (isRating || !onRate) return
    
    try {
      setIsRating(true)
      await onRate(recipe.id, isLike)
    } finally {
      setIsRating(false)
    }
  }

  return (
    <>
      <div 
        className="relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{recipe.name}</h3>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <span>{recipe.cookingStyle}</span>
            <span className="mx-2">•</span>
            <span>{totalTime} mins</span>
            <span className="mx-2">•</span>
            <span>Serves {recipe.servings}</span>
          </div>
          {recipe.rating > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Rating: {recipe.rating.toFixed(1)} ({recipe.ratingCount} votes)
            </div>
          )}
        </div>
        
        {/* Rating buttons */}
        {onRate && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRate(true)
              }}
              disabled={isRating}
              className={`p-2 rounded-full ${
                isRating ? 'opacity-50 cursor-not-allowed' : ''
              } bg-white/80 text-gray-600 hover:bg-green-100`}
            >
              👍
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRate(false)
              }}
              disabled={isRating}
              className={`p-2 rounded-full ${
                isRating ? 'opacity-50 cursor-not-allowed' : ''
              } bg-white/80 text-gray-600 hover:bg-red-100`}
            >
              👎
            </button>
          </div>
        )}
      </div>

      <RecipeModal
        recipe={recipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 