import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const recipes = [
  {
    name: 'Lemon Garlic Salmon Tray Bake',
    cookingStyle: 'OVEN',
    ingredients: [
      'Salmon fillet',
      'Broccoli',
      'Cherry tomatoes',
      'Red onion',
      'Lemon'
    ],
    methodSteps: [
      'Preheat oven to 200°C',
      'Arrange salmon with broccoli, cherry tomatoes, and red onion on a tray',
      'Drizzle with olive oil and lemon juice, season with salt and pepper',
      'Bake for 15 mins'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/lemon_garlic_salmon.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Spicy Shrimp & Veg One-Pot Pasta',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Shrimp',
      'Whole wheat pasta',
      'Spinach',
      'Cherry tomatoes',
      'Bell pepper',
      'Garlic'
    ],
    methodSteps: [
      'Sauté garlic in olive oil',
      'Add shrimp and cook for 2 mins',
      'Stir in pasta, spinach, halved cherry tomatoes, and sliced bell pepper with water',
      'Simmer until pasta is al dente',
      'Season with chili flakes and salt'
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    imageUrl: 'https://example.com/spicy_shrimp_pasta.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Hot Grilled Chicken Avocado Wrap',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Avocado',
      'Romaine lettuce',
      'Red bell pepper',
      'Lime'
    ],
    methodSteps: [
      'Grill seasoned chicken until cooked',
      'Slice and warm in a tortilla',
      'Sauté red bell pepper lightly',
      'Fill the warm wrap with chicken, avocado slices, and heated lettuce',
      'Drizzle with lime juice'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/hot_chicken_avocado_wrap.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Thai Basil Chicken Rice Bowl',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Brown rice',
      'Red bell pepper',
      'Thai basil',
      'Garlic',
      'Thai chili'
    ],
    methodSteps: [
      'Sauté garlic and thinly sliced chicken until browned',
      'Add red bell pepper and cooked brown rice',
      'Stir in chopped Thai basil and minced Thai chili',
      'Finish with a splash of lime juice'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/thai_basil_chicken_rice_bowl.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'One-Pot Lemon Chicken Orzo',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Orzo pasta',
      'Spinach',
      'Cherry tomatoes',
      'Lemon'
    ],
    methodSteps: [
      'Sauté diced chicken in olive oil',
      'Add orzo and water',
      'When the orzo is tender, stir in fresh spinach and halved cherry tomatoes',
      'Finish with lemon juice and seasonings'
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    imageUrl: 'https://example.com/lemon_chicken_orzo.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Quick Beef & Broccoli Stir-Fry',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Lean beef strips',
      'Broccoli',
      'Red bell pepper',
      'Carrot',
      'Garlic',
      'Ginger'
    ],
    methodSteps: [
      'Stir-fry beef in hot olive oil until browned',
      'Add broccoli, sliced red bell pepper, and carrot along with minced garlic and ginger',
      'Cook until the vegetables are crisp-tender'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/beef_broccoli_stirfry.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Garlic Chicken Pasta',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Whole wheat pasta',
      'Garlic',
      'Cherry tomatoes',
      'Spinach'
    ],
    methodSteps: [
      'Cook pasta to al dente',
      'Sauté sliced chicken with garlic in olive oil',
      'Add halved cherry tomatoes and fresh spinach',
      'Toss with the pasta and season'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/garlic_chicken_pasta.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Fish & Lemon Rice',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'White fish fillet',
      'Brown rice',
      'Green beans',
      'Lemon',
      'Dill'
    ],
    methodSteps: [
      'Season and pan-fry the fish in olive oil until flaky',
      'Steam green beans',
      'Combine with warm brown rice',
      'Top with fish, drizzle with lemon juice, and garnish with dill'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/fish_lemon_rice.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Beef & Tomato Pasta Bake',
    cookingStyle: 'OVEN',
    ingredients: [
      'Ground beef',
      'Whole wheat pasta',
      'Cherry tomatoes',
      'Garlic',
      'Basil'
    ],
    methodSteps: [
      'Cook pasta and brown ground beef with garlic',
      'Mix in halved cherry tomatoes and basil',
      'Combine with the pasta',
      'Transfer to a baking dish and bake until bubbly'
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    imageUrl: 'https://example.com/beef_tomato_pasta_bake.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Lemon Herb Fish Pasta',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'White fish fillet',
      'Whole wheat pasta',
      'Zucchini',
      'Lemon',
      'Fresh parsley'
    ],
    methodSteps: [
      'Cook pasta until al dente',
      'Pan-fry fish with sliced zucchini in olive oil',
      'Flake the fish and toss with pasta and lemon juice',
      'Garnish with parsley'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/lemon_herb_fish_pasta.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Hot Chicken Veggie Wrap',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Bell pepper',
      'Zucchini',
      'Whole wheat tortilla',
      'Avocado'
    ],
    methodSteps: [
      'Grill chicken until cooked and slice thinly',
      'Sauté sliced bell pepper and zucchini until tender',
      'Fill a warm tortilla with the chicken, veggies, and avocado slices'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/hot_chicken_veggie_wrap.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Veggie Stir-Fry Noodles',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Mixed vegetables (broccoli, bell pepper, carrot)',
      'Whole wheat noodles',
      'Garlic',
      'Ginger',
      'Soy sauce'
    ],
    methodSteps: [
      'Stir-fry vegetables with garlic and ginger in olive oil',
      'Toss in cooked noodles and a splash of soy sauce until everything is heated through'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/veggie_stirfry_noodles.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Chickpea & Spinach Curry',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Canned chickpeas',
      'Spinach',
      'Cherry tomatoes',
      'Onion',
      'Curry powder'
    ],
    methodSteps: [
      'Sauté diced onion in olive oil',
      'Add chickpeas and halved cherry tomatoes',
      'Stir in spinach and curry powder',
      'Simmer until the flavors meld'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/chickpea_spinach_curry.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Hot Turkey & Veggie Wraps',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Ground turkey',
      'Red bell pepper',
      'Carrot',
      'Lettuce (lightly warmed)',
      'Garlic'
    ],
    methodSteps: [
      'Brown ground turkey with diced red bell pepper and carrot',
      'Briefly warm butter lettuce or use a tortilla as a wrap',
      'Fill with the hot turkey mixture'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/hot_turkey_veggie_wraps.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Garlic Lime Shrimp Rice Bowl',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Shrimp',
      'Brown rice',
      'Avocado',
      'Red bell pepper',
      'Lime'
    ],
    methodSteps: [
      'Sauté shrimp with garlic and lime juice until pink',
      'Serve over warm brown rice topped with diced red bell pepper and gently heated avocado'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/garlic_lime_shrimp_rice_bowl.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Zesty Chicken Fajita Pasta',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Whole wheat pasta',
      'Red bell pepper',
      'Green bell pepper',
      'Lime',
      'Chili powder'
    ],
    methodSteps: [
      'Sauté sliced chicken with both bell peppers and chili powder until cooked',
      'Toss with pasta and finish with a drizzle of lime juice'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/zesty_chicken_fajita_pasta.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Healthy Salmon & Avocado Rice Bowl',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Salmon fillet',
      'Brown rice',
      'Avocado',
      'Edamame',
      'Lemon'
    ],
    methodSteps: [
      'Grill seasoned salmon until cooked, then flake',
      'Serve over warm brown rice with slices of avocado and steamed edamame',
      'Finish with a squeeze of lemon'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/healthy_salmon_avocado_rice_bowl.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Hot Chicken Caesar Wrap',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Whole wheat tortilla',
      'Kale (warmed)',
      'Parmesan',
      'Caesar dressing'
    ],
    methodSteps: [
      'Grill chicken until cooked, slice, and toss with lightly sautéed kale and Caesar dressing',
      'Fill a tortilla with the mixture and sprinkle with Parmesan'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/hot_chicken_caesar_wrap.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Easy Veggie Pasta Primavera',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Whole wheat pasta',
      'Zucchini',
      'Cherry tomatoes',
      'Spinach',
      'Lemon'
    ],
    methodSteps: [
      'Cook pasta until al dente',
      'Sauté zucchini and halved cherry tomatoes in olive oil',
      'Combine with pasta and spinach, finishing with lemon juice'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl: 'https://example.com/easy_veggie_pasta_primavera.jpg',
    rating: 0,
    ratingCount: 0
  },
  {
    name: 'Citrus Herb Chicken Stir-Fry',
    cookingStyle: 'STOVETOP',
    ingredients: [
      'Chicken breast',
      'Broccoli',
      'Red bell pepper',
      'Orange',
      'Garlic'
    ],
    methodSteps: [
      'Stir-fry sliced chicken with garlic until nearly cooked',
      'Add broccoli and red bell pepper',
      'Finish with fresh orange juice and seasonings'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    imageUrl: 'https://example.com/citrus_herb_chicken_stirfry.jpg',
    rating: 0,
    ratingCount: 0
  }
]

async function updateRecipes() {
  try {
    // First, delete all existing recipes
    await prisma.recipe.deleteMany({})
    console.log('Deleted all existing recipes')

    // Then insert the new recipes
    const createdRecipes = await prisma.recipe.createMany({
      data: recipes
    })

    console.log(`Successfully created ${createdRecipes.count} recipes`)
  } catch (error) {
    console.error('Error updating recipes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateRecipes() 