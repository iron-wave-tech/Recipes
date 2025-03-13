// Generate a persistent user ID for the client
export function getUserId(): string {
  if (typeof window === 'undefined') return ''
  
  let userId = localStorage.getItem('userId')
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('userId', userId)
  }
  return userId
}

// Get user's liked recipes
export function getLikedRecipes(): string[] {
  if (typeof window === 'undefined') return []
  
  const liked = localStorage.getItem('likedRecipes')
  return liked ? JSON.parse(liked) : []
}

// Get user's disliked recipes
export function getDislikedRecipes(): string[] {
  if (typeof window === 'undefined') return []
  
  const disliked = localStorage.getItem('dislikedRecipes')
  return disliked ? JSON.parse(disliked) : []
}

// Add a recipe to liked list
export function addLikedRecipe(recipeId: string) {
  const liked = getLikedRecipes()
  const disliked = getDislikedRecipes().filter(id => id !== recipeId)
  
  localStorage.setItem('likedRecipes', JSON.stringify([...new Set([...liked, recipeId])]))
} 