import React from 'react'
import RecipeForm from '@/components/RecipeForm'

export default function NewRecipePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>
      <RecipeForm />
    </div>
  )
} 