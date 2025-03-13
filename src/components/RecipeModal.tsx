'use client'

import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

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

interface RecipeModalProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export default function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!recipe) return null

  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>

                  {/* Recipe header */}
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 pr-10">
                    {recipe.name}
                  </Dialog.Title>
                  
                  {/* Recipe meta info */}
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-1" />
                      {totalTime} mins
                    </span>
                    <span className="flex items-center">
                      <UserIcon className="h-5 w-5 mr-1" />
                      Serves {recipe.servings}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {recipe.cookingStyle}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h4>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-600">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Method */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Method</h4>
                      <ol className="space-y-4">
                        {recipe.methodSteps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Rating info */}
                  {recipe.rating > 0 && (
                    <div className="mt-6 text-sm text-gray-500 border-t pt-4">
                      Rating: {recipe.rating.toFixed(1)} ({recipe.ratingCount} votes)
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 