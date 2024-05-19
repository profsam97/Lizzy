import { MealI } from "./meal.interface";

export interface IContext  {
    category: string,
    searchTerm: string,
    hasClicked: boolean,
    favourites: MealI[];
    mode: boolean,
    handleSwitchMode : () => void,
    handleHasClicked: () => void
    handleUpdateCategory: (category : string) => void
    updateSearchTerm: (term : string) => void,
    handleAddFavourite: (meal : MealI) => void,
    handleRemoveFavourite: (mealId : string) => void
}