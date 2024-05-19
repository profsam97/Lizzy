

const baseUrl : string =  'https://www.themealdb.com/api/json/v1/1'
export  const ApiRoutes = {
    MEALS    :             `${baseUrl}/`,
    SEARCH_MEAL :           `${baseUrl}/search.php?s`,
    VIEW_MEAL  :           `${baseUrl}/lookup.php?i`,
    VIEW_CATEGORY :        `${baseUrl}/filter.php?c`,
    VIEW_CATEGORIES :      `${baseUrl}/categories.php`,
    FILTER_BY_AREA:        `${baseUrl}/filter.php?a`,
    FILTER_BY_INGREDIENT: `${baseUrl}/filter.php?i`,
    FILTER_BY_LETTER:     `${baseUrl}/search.php?f`
}   