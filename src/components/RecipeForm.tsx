'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Ingredient {
  name: string
  amount: number
  unit: string
  isPantryStaple: boolean
}

export default function RecipeForm() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', amount: 0, unit: '', isPantryStaple: false }])
  const [method, setMethod] = useState<string[]>([''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: '', isPantryStaple: false }])
  }

  const addMethodStep = () => {
    setMethod([...method, ''])
  }

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number | boolean) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setIngredients(newIngredients)
  }

  const updateMethodStep = (index: number, value: string) => {
    const newMethod = [...method]
    newMethod[index] = value
    setMethod(newMethod)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const recipeData = {
      name: formData.get('name'),
      cookingStyle: formData.get('cookingStyle'),
      prepTime: parseInt(formData.get('prepTime') as string),
      cookTime: parseInt(formData.get('cookTime') as string),
      servings: parseInt(formData.get('servings') as string),
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      method: method.filter(step => step.trim() !== '')
    }

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })

      if (!response.ok) throw new Error('Failed to create recipe')

      const recipe = await response.json()
      router.push(`/recipes/${recipe.id}`)
    } catch (error) {
      console.error('Error creating recipe:', error)
      // Handle error (show message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cookingStyle" className="block text-sm font-medium text-gray-700">Cooking Style</label>
            <select
              id="cookingStyle"
              name="cookingStyle"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="OVEN">Oven</option>
              <option value="STOVETOP">Stovetop</option>
              <option value="GRILL">Grill</option>
              <option value="NO_COOK">No Cook</option>
            </select>
          </div>

          <div>
            <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700">Prep Time (mins)</label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700">Cook Time (mins)</label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Servings</label>
          <input
            type="number"
            id="servings"
            name="servings"
            required
            min="1"
            className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
        <div className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="Ingredient name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                value={ingredient.amount || ''}
                onChange={(e) => updateIngredient(index, 'amount', parseFloat(e.target.value))}
                placeholder="Amount"
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                placeholder="Unit"
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={ingredient.isPantryStaple}
                  onChange={(e) => updateIngredient(index, 'isPantryStaple', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Pantry Item</span>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Add Ingredient
          </button>
        </div>
      </div>

      {/* Method */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Method</h2>
        <div className="space-y-4">
          {method.map((step, index) => (
            <div key={index} className="flex gap-4">
              <textarea
                value={step}
                onChange={(e) => updateMethodStep(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                rows={2}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMethodStep}
            className="mt-2 px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Add Step
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Recipe'}
        </button>
      </div>
    </form>
  )
} 