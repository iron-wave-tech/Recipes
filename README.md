# Smart Recipe Planner

A modern web application for managing recipes with smart shopping list suggestions. The app helps you optimize your grocery shopping by suggesting additional recipes you can make with just a few extra ingredients.

## Features

- 🍳 Organize recipes by cooking style (Oven, Stovetop, Grill, No-Cook)
- 📝 Detailed recipe management with prep time, cook time, and servings
- 🏪 Mark ingredients as pantry staples
- 🛒 Smart recipe suggestions based on shared ingredients
- 🎨 Clean, modern, and responsive design

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/atlas) (You can use MongoDB Atlas for free)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`:
     ```
     DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
     ```
   - Replace `<username>`, `<password>`, `<cluster-url>`, and `<database-name>` with your MongoDB details

3. **Set Up the Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Running the Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a New Recipe

1. Click "Recipes" in the navigation
2. Click "Add New Recipe"
3. Fill in the recipe details:
   - Basic information (name, cooking style, times)
   - Ingredients (with amounts and units)
   - Mark pantry staples (common ingredients like salt, pepper)
   - Method steps
4. Click "Save Recipe"

### Viewing Recipes

- Browse all recipes on the home page
- Filter recipes by cooking style
- Click a recipe to view its details
- View smart suggestions for other recipes you can make with similar ingredients

### Smart Shopping List

The app will suggest recipes that share ingredients with your selected recipe, helping you:
- Optimize your grocery shopping
- Discover new recipes you can make with minimal extra ingredients
- Plan multiple meals efficiently

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── recipes/           # Recipe pages
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
│   └── db/               # Database configuration
└── utils/                # Helper functions
```

## Database Schema

### Recipe
- `id`: Unique identifier
- `name`: Recipe name
- `cookingStyle`: Cooking method (OVEN, STOVETOP, etc.)
- `ingredients`: List of ingredients with amounts
- `method`: Array of cooking steps
- `prepTime`: Preparation time in minutes
- `cookTime`: Cooking time in minutes
- `servings`: Number of servings
- `image`: Optional image URL

### PantryItem
- `id`: Unique identifier
- `name`: Item name
- `unit`: Standard unit of measurement

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details 