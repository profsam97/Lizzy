import React, {useCallback, useState} from "react";
import ContextApi from "./ContextApi";
import { MealI } from "../interfaces/meal.interface";
interface IProvider {
    children: React.ReactNode
}
const ContextProvider  : React.FC<IProvider>= ({children}) => {
    //this component makes our state global, that is accessible component-wide
    const [category, setCategory] = useState<string>('')
    const  [hasClicked, setHasClicked] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [favourites, setFavourites] = useState<MealI[]>([])
    const [mode, setMode] = useState<boolean>(false)

    const handleSwitchMode = useCallback(() => {
        setMode((prev) => !prev)
    }, [])
    const updateSearchTerm = (term : string) => {
        setSearchTerm(term)
    }

    const handleAddFavourite = useCallback((meal : MealI) => {
        console.log('..adding')
        const newFavourite = favourites;

        newFavourite.push(meal);

        setFavourites(newFavourite)
        console.log(favourites)
    },[favourites])

    const handleRemoveFavourite = useCallback((mealId : string) => {

        setFavourites((prevMeal) => {
            return prevMeal.filter((meal : MealI) => meal.idMeal !== mealId);
        })
      
    },[])
    const handleUpdateCategory = (category : string) => {
        setCategory(category)
    }
    const handleHasClicked = () => {
        setHasClicked(true)
    }

        const content = {
                category,
                handleUpdateCategory,
                hasClicked,
                handleHasClicked,
                searchTerm,
                updateSearchTerm,
                handleAddFavourite,
                handleRemoveFavourite,
                favourites,
                mode,
                handleSwitchMode
        }
        return (
            <ContextApi.Provider value={content}>
                {children}
            </ContextApi.Provider>
    )

}

export default ContextProvider