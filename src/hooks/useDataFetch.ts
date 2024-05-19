import axios from "axios";
import { ApiRoutes } from "../constants";
import { useInfiniteQuery, useQuery } from "react-query";
import { useContext } from "react";
import ContextApi from "../store/ContextApi";

export const useFetchCategories = (onSuccess: any) => {

    const handleFetchCategories = async () => {
        const response = await axios.get(
            `${ApiRoutes.VIEW_CATEGORIES}`
        );
        return response.data;
    }
    return useQuery('fetchCategory', handleFetchCategories, {onSuccess})

}

export const useFetchMealDetail = (onSuccess : any, mealId: string) => {

    const handleFetchMealDetail = async () => {
        const response = await axios.get(
            `${ApiRoutes.VIEW_MEAL}=${mealId}`
        )
        console.log(response)
        return response.data
    }
    return useQuery('viewMeal', handleFetchMealDetail, {onSuccess})
}


export const useFilterByCategory = () => {
    const category = useContext(ContextApi).category;

    const handleFetchMeal = async ({ pageParam = 1 }: { pageParam?: number}) => {
        const response = await axios.get(
            `${ApiRoutes.VIEW_CATEGORY}=${category}`   
        );
        const meals = response.data.meals || [];
        const start = (pageParam - 1) * 10;
        const end = start + 10;
        return {
          meals: meals.slice(start, end),
          nextPage: end < meals.length ? pageParam + 1 : undefined,
        };
      };
      return useInfiniteQuery(
        ['filterCategory', category],
        handleFetchMeal,
        {
          getNextPageParam: (lastPage) => lastPage.nextPage,
          enabled: category !== '',
        }
      );
}

export const useFilterByLetter = (letter: string) => {

  const handleFilterByLetter = async ({ pageParam = 1 }: { pageParam?: number}) => {
      const response = await axios.get(
          `${ApiRoutes.FILTER_BY_LETTER}=${letter}`   
      );
      const meals = response.data.meals || [];
      const start = (pageParam - 1) * 10;
      const end = start + 10;
      return {
        meals: meals.slice(start, end),
        nextPage: end < meals.length ? pageParam + 1 : undefined,
      };
    };
    return useInfiniteQuery(
      ['filterByLetter', letter],
      handleFilterByLetter,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: letter !== '',
      }
    );
}


export const useFilterByArea = (area: string) => {

  const handleFilterByArea = async ({ pageParam = 1 }: { pageParam?: number}) => {
      const response = await axios.get(
          `${ApiRoutes.FILTER_BY_AREA}=${area}`   
      );
      const meals = response.data.meals || [];
      const start = (pageParam - 1) * 10;
      const end = start + 10;
      return {
        meals: meals.slice(start, end),
        nextPage: end < meals.length ? pageParam + 1 : undefined,
      };
    };
    return useInfiniteQuery(
      ['filterByArea', area],
      handleFilterByArea,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: area !== '',
      }
    );
}


export const useFilterByIngredient = (ingredient: string) => {

  const handleFilterByIngredient = async ({ pageParam = 1 }: { pageParam?: number}) => {
      const response = await axios.get(
          `${ApiRoutes.FILTER_BY_INGREDIENT}=${ingredient}`   
      );
      const meals = response.data.meals || [];
      const start = (pageParam - 1) * 10;
      const end = start + 10;
      return {
        meals: meals.slice(start, end),
        nextPage: end < meals.length ? pageParam + 1 : undefined,
      };
    };
    return useInfiniteQuery(
      ['filterByIngredient', ingredient],
      handleFilterByIngredient,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: ingredient !== '',
      }
    );
}


export const useFetchMeal = () => {
    const searchTerm = useContext(ContextApi).searchTerm;

    const handleFetchMeal = async ({ pageParam = 1 }: { pageParam?: number}) => {
        const response = await axios.get(
            `${ApiRoutes.SEARCH_MEAL}=${searchTerm}`   
        );
        const meals = response.data.meals || [];
        const start = (pageParam - 1) * 10;
        const end = start + 10;
        return {
          meals: meals.slice(start, end),
          nextPage: end < meals.length ? pageParam + 1 : undefined,
        };
      };
      return useInfiniteQuery(
        ['meals', searchTerm],
        handleFetchMeal,
        {
          getNextPageParam: (lastPage) => lastPage.nextPage,
          enabled: searchTerm.length >= 3,
        }
      );
}