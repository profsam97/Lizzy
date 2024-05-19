import {  Button, Chip, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import {  useFilterByIngredient } from "../hooks/useDataFetch";
import { ICatMeals } from "../interfaces/category.interface";
import CatMealCard from "../utils/MealCatCard";
import { ingredients } from "../constants";
import { useObserver } from "../hooks/useObserver";

const FilterMealByIngredient = () => {

    const [ingredient, setIngredient] = useState<string>('Chicken');

    const handleFilter = (ingredient : string) => {
        setIngredient(ingredient)
    }
 
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByIngredient(ingredient)
    const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage );
    useEffect(() => {
        refetch()
    },[ingredient])
    return (
        <Stack direction={'column'} spacing={2} sx={{my:4}}>
            <Typography variant="h6" gutterBottom>
            Filter by Ingredient
             </Typography>
             <Stack direction={'row'} spacing={2} sx={{gap:1}} flexWrap={'wrap'}>
             {ingredients.map((source, index) => (
                <Chip  sx={{py:1}} key={index} label={source} color={ingredient === source ? 'primary' : 'default'}  onClick={() => handleFilter(source)} />
             ))}
             </Stack>
             {isLoading && <CircularProgress/>}

             {isError && <Stack direction='row'> <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={() => refetch}> Retry </Button> 
                 </Stack>}
             {isSuccess && data?.pages[0].meals.length === 0 && <Typography variant="subtitle1" textAlign={'center'}>No Meal Found for this Ingredient</Typography>}

             <Grid container spacing={2}>
                {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
          {page.meals.map((meal :  ICatMeals, mealIndex: number) => {
            if (page.meals.length === mealIndex + 1) {
              return (
                <Grid  ref={lastMealElementRef} key={mealIndex} item xs={12} sm={6}  md={4}>
                <CatMealCard meals={meal} />
            </Grid>
              );
            } else {
              return (
                <Grid  key={mealIndex} item xs={12} sm={6}  md={4}>
                <CatMealCard meals={meal} />
            </Grid>
              );
            }
          })}
             </React.Fragment>
        ))}
        </Grid>
        {isFetchingNextPage && <Typography variant="body1" textAlign={'center'} > Fetching... <CircularProgress /></Typography>}

                
        </Stack>
    )
}

export default FilterMealByIngredient;