'use client'

import React, { useState, useEffect } from 'react'
import RecipeCard from '@/components/RecipeCard'
import { getUserId } from '@/utils/userPreferences'

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

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [cookingStyle, setCookingStyle] = useState('')
  const [surpriseRecipe, setSurpriseRecipe] = useState<Recipe | null>(null)
  const [dislikedRecipes, setDislikedRecipes] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const userId = getUserId()

  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe => 
        (!cookingStyle || recipe.cookingStyle === cookingStyle) &&
        !dislikedRecipes.has(recipe.id)
      )
    )
  }, [recipes, cookingStyle, dislikedRecipes])

  const fetchRecipes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/recipes')
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSurpriseMe = () => {
    if (filteredRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRecipes.length)
      setSurpriseRecipe(filteredRecipes[randomIndex])
    }
  }

  const handleRate = async (recipeId: string, isLike: boolean) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLike }),
      })

      if (!response.ok) {
        throw new Error('Failed to rate recipe')
      }

      // If disliked, add to disliked set and remove from surprise if it's the disliked recipe
      if (!isLike) {
        setDislikedRecipes(prev => {
          const newSet = new Set(prev)
          newSet.add(recipeId)
          return newSet
        })
        if (surpriseRecipe?.id === recipeId) {
          setSurpriseRecipe(null)
        }
      }

      // Update recipes with new rating
      const updatedRecipe = await response.json()
      setRecipes(prev => 
        prev.map(recipe => 
          recipe.id === recipeId ? updatedRecipe : recipe
        )
      )
    } catch (error) {
      console.error('Error rating recipe:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">My Recipes</h2>
          <div className="flex space-x-4">
            <select
              value={cookingStyle}
              onChange={(e) => setCookingStyle(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Styles</option>
              <option value="OVEN">Oven</option>
              <option value="STOVETOP">Stovetop</option>
              <option value="GRILL">Grill</option>
              <option value="NO_COOK">No Cook</option>
            </select>
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
              disabled={filteredRecipes.length === 0}
            >
              Surprise Me! 🎲
            </button>
          </div>
        </div>

        {/* Surprise Recipe Section */}
        {surpriseRecipe && (
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">Here's a surprise recipe for you! ✨</h3>
            <div className="max-w-sm">
              <RecipeCard
                recipe={surpriseRecipe}
                onRate={handleRate}
              />
            </div>
          </div>
        )}

        {/* All Recipes */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All Recipes</h3>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onRate={handleRate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {recipes.length === 0 ? (
                'No recipes found. Please try again later.'
              ) : (
                'No recipes match your current filters. Try changing your selection!'
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 