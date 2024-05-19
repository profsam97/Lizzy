import { Ingredient, MealI } from "../interfaces/meal.interface";

export const transformMealData = (meal: MealI) : Ingredient[] => {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient) {
        ingredients.push({
          ingredient,
          measure: measure || '',
        });
      }
    }
    
    return ingredients;
  };