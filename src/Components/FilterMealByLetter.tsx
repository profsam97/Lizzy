import {  Button, Chip, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import { MealI } from "../interfaces/meal.interface";
import { useFilterByLetter } from "../hooks/useDataFetch";
import MealCard from "../utils/MealCard";
import { alphabets } from "../constants/alphabets";
import { useObserver } from "../hooks/useObserver";

const FilterMealByLetter = () => {

    const [letter, setLetter] = useState<string>('a');

    const handleFilter = (alphabet : string) => {
        setLetter(alphabet)
    }
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByLetter(letter)
    const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage );
    useEffect(() => {
        refetch()
    },[letter])
    return (
        <Stack direction={'column'} spacing={2} my={4}>
            <Typography variant="h6" gutterBottom>
            Filter by letter
             </Typography>
             <Stack direction={'row'} spacing={1} flexWrap={'wrap'}>
             {alphabets.map((alphabet, index) => (
                <Chip key={index} label={alphabet} color={letter === alphabet ? 'primary' : 'default'}  onClick={() => handleFilter(alphabet)} />
             ))}
             </Stack>
             {isLoading && <CircularProgress/>}
             {isError && <Stack direction='row'> <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={() => refetch}> Retry </Button> 
                 </Stack>}
             {isSuccess && data?.pages[0].meals.length === 0 && <Typography variant="subtitle1" textAlign={'center'}>No Meal Found for this letter</Typography>}
             <Grid container spacing={2}>
                {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
          {page.meals.map((meal : MealI , mealIndex: number) => {
            if (page.meals.length === mealIndex + 1) {
              return (
                <Grid  ref={lastMealElementRef} key={mealIndex} item xs={12} sm={6}  md={4}>
                <MealCard meal={meal} />
            </Grid>
              );
            } else {
              return (
                <Grid  key={mealIndex} item xs={12} sm={6}  md={4}>
                <MealCard meal={meal} />
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

export default FilterMealByLetter;