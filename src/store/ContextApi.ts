import React from "react";
import { IContext } from "../interfaces/context.interface";
import { MealI } from "../interfaces/meal.interface";


//setting the default values makes it easy for our ide to suggest autocomplete and also for type checking
const ContextApi =  React.createContext<IContext>({
    category: '',
    searchTerm: '',
    updateSearchTerm(term) {
        term
    },
    hasClicked: false,
    mode: false,
    handleSwitchMode() {
        
    },
    favourites: [],
    handleUpdateCategory(category) {
        category
    },
    handleHasClicked: () => {},
    handleAddFavourite(meal : MealI) {
        meal
    },
    handleRemoveFavourite(mealId: string) {
        mealId
    },
})

export default ContextApi;