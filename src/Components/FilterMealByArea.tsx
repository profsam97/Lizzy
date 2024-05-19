import {  Button, Chip, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useFilterByArea } from "../hooks/useDataFetch";
import { areas } from "../constants";
import { ICatMeals } from "../interfaces/category.interface";
import CatMealCard from "../utils/MealCatCard";
import { useObserver } from "../hooks/useObserver";

const FilterMealByArea = () => {

    const [area, setArea] = useState<string>('American');

    const handleFilter = (location : string) => {
        setArea(location)
    }
 
    useEffect(() => {
        refetch()
    },[area])
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByArea(area)
    const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage );
    return (
        <Stack direction={'column'} spacing={2} sx={{my:4}}>
            <Typography variant="h6" gutterBottom>
            Filter by Area
             </Typography>
             <Stack direction={'row'} spacing={2} sx={{gap:1}} flexWrap={'wrap'}>
             {areas.map((location, index) => (
                <Chip  sx={{py:1}} key={index} label={location} color={area === location ? 'primary' : 'default'}  onClick={() => handleFilter(location)} />
             ))}
             </Stack>
             {isLoading && <CircularProgress/>}

             {isError && <Stack direction='row'> <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={() => refetch}> Retry </Button> 
                 </Stack>}
             {isSuccess && data?.pages[0].meals.length === 0 && <Typography variant="subtitle1" textAlign={'center'}>No Meal Found for this area</Typography>}

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

export default FilterMealByArea;