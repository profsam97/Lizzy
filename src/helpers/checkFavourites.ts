import {  useContext } from "react"
import { MealI } from "../interfaces/meal.interface"
import ContextApi from "../store/ContextApi"

export const checkIfInFavourites = (mealId: string ) : boolean => {
    const favourites = useContext(ContextApi).favourites;
    const isFavourite : MealI | undefined =  favourites.find((fav) => fav.idMeal === mealId);

    return  isFavourite ? true : false;
} 