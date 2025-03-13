const recipes = [
  {
    "name": "Mushroom Risotto",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g Arborio rice; 1 cup mushrooms (sliced); 1/2 cup white wine; 2 cups chicken broth; 1 onion (diced); Parmesan; garlic; olive oil; salt; pepper",
    "methodSteps": "Sauté onions and mushrooms, add rice and deglaze with white wine, slowly stir in broth until creamy, and finish with Parmesan.",
    "prepTime": "15 mins",
    "cookTime": "25 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Claypot Chicken Rice",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g chicken thighs; 1 cup rice; 1 cup mixed vegetables; 1 tbsp soy sauce; garlic; ginger; water; salt",
    "methodSteps": "Layer chicken, rice, and veggies in a claypot with seasonings; simmer until the rice is cooked.",
    "prepTime": "10 mins",
    "cookTime": "25 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Chili Lime Shrimp Bowl",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g shrimp; 1 cup cooked rice; 1 red bell pepper (sliced); 1 lime (juiced); chili powder; olive oil; salt; pepper",
    "methodSteps": "Sauté shrimp with a sprinkle of chili powder, combine with rice and bell pepper, and finish with fresh lime juice.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Roasted Veggie & Hummus Wrap",
    "cookingStyle": "NO_COOK",
    "ingredients": "1 whole wheat wrap; 1 cup assorted roasted vegetables; 2 tbsp hummus; spinach leaves; salt; pepper",
    "methodSteps": "Spread hummus on a wrap, layer with roasted vegetables and fresh spinach, and roll tightly.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Garlic Parmesan Pasta",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g pasta; 2 garlic cloves (minced); 2 tbsp Parmesan; olive oil; parsley; salt; pepper",
    "methodSteps": "Cook pasta; sauté garlic in olive oil; toss pasta with Parmesan and garnish with parsley.",
    "prepTime": "10 mins",
    "cookTime": "12 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Chicken Alfredo Pasta",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g chicken breast; 150g pasta; 1/2 cup Alfredo sauce; 1 garlic clove (minced); olive oil; salt; pepper; parsley",
    "methodSteps": "Cook pasta; sauté chicken with garlic; combine with Alfredo sauce and toss with pasta.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Beef Stroganoff",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g beef strips; 1 cup mushrooms; 1 onion (sliced); 1/2 cup sour cream; 1 tbsp olive oil; garlic; paprika; salt; pepper",
    "methodSteps": "Brown beef and onions, add mushrooms, then stir in sour cream and seasonings; simmer until thickened.",
    "prepTime": "15 mins",
    "cookTime": "15 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Cajun Shrimp Pasta",
    "cookingStyle": "STOVETOP",
    "ingredients": "150g shrimp; 150g pasta; 1 tbsp Cajun seasoning; 1 tbsp olive oil; 1 garlic clove (minced); cherry tomatoes; salt; pepper",
    "methodSteps": "Toss shrimp with Cajun seasoning, sauté until cooked, then mix with pasta and halved cherry tomatoes.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Vegetable Curry Rice",
    "cookingStyle": "STOVETOP",
    "ingredients": "1 cup cooked rice; 1 cup mixed vegetables; 1 tbsp curry powder; 1 can coconut milk; 1 onion; garlic; salt; pepper",
    "methodSteps": "Sauté onion, garlic, and vegetables; add rice, curry powder, and coconut milk; simmer until flavors meld.",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "servings": "2",
    "imageUrl": "N/A"
  },
  {
    "name": "Sesame Tofu Bowl",
    "cookingStyle": "STOVETOP",
    "ingredients": "200g tofu; 1 cup brown rice (cooked); 1 cup steamed broccoli; 1 tbsp soy sauce; 1 tsp sesame oil; sesame seeds; garlic; ginger",
    "methodSteps": "Sauté tofu until crisp, then serve over brown rice and broccoli, drizzled with soy sauce and sesame oil.",
    "prepTime": "10 mins",
    "cookTime": "10 mins",
    "servings": "2",
    "imageUrl": "N/A"
  }
];

async function importRecipes() {
  try {
    const response = await fetch('http://localhost:3004/api/recipes/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(recipes),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to import recipes: ${errorText}`);
    }

    const result = await response.json();
    console.log('Successfully imported recipes:', result);
  } catch (error) {
    console.error('Error importing recipes:', error);
  }
}

importRecipes(); 