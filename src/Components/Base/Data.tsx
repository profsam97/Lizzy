import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {DataI} from "../../interfaces/data.interface.ts";
import { useObserver } from "../../hooks/useObserver.ts";
import React from "react";
import CatMealCard from "../../utils/MealCatCard.tsx";
import MealCard from "../../utils/MealCard.tsx";

const BaseData : React.FC<DataI> = ({data, catMeal, isFetchingNextPage, hasNextPage, fetchNextPage}) => {
    const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage)

    return (
        <Box>
        <Grid container spacing={2}>
            {data?.pages.map((page : any,  pageIndex : number) => (
          <React.Fragment key={pageIndex}>
            {page.meals.map((meal : any, mealIndex: number) => {
          if (page.meals.length === mealIndex + 1) {
        return (
            <Grid  ref={lastMealElementRef} key={mealIndex} item xs={12} sm={6}  md={4}>
            {catMeal ? <CatMealCard meals={meal} />    :   <MealCard meal={meal} />} 
         </Grid>
        );
    } else {
        return (
            <Grid  key={mealIndex} item xs={12} sm={6}  md={4}>
                {catMeal ? <CatMealCard meals={meal} />    :   <MealCard meal={meal} />} 
              </Grid>
                );
              }
            })}
              </React.Fragment>
            ))}
            </Grid>  
            {isFetchingNextPage && <Typography variant="body1" textAlign={'center'} > Fetching... <CircularProgress /></Typography>}

            </Box>   
    )
}

export default BaseData;