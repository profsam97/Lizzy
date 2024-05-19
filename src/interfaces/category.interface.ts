export interface ICategory {
    strCategory: string,
    strCategoryDescription: string,
    strCategoryThumb: string
}

export interface IFetchedCategory {
    categories: ICategory[]
}

export interface ICatMeals {
    strMeal: string,
    strMealThumb: string,
    idMeal: string
}