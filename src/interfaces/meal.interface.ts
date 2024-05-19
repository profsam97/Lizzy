export interface MealI {
    idMeal: string,
    strMeal: string,
    strArea: string,
    strCategory: string,
    strInstructions: string,
    strMealThumb: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string
    strIngredient10: string,
    strMeasure1: string,
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    [key: string]: string | null; 
}

export interface onMealSuccessI {
    meals : MealI[]
}

export interface Ingredient {
    ingredient: string;
    measure: string;
  }