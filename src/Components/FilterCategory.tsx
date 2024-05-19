import { Alert, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { ICatMeals } from "../interfaces/category.interface"
import CatMealCard from "../utils/MealCatCard";
import { useFilterByCategory } from "../hooks/useDataFetch";
import { useObserver } from "../hooks/useObserver";
import React from "react";

interface IFiterCat  {
    category : string,
}
const FilterCategory : React.FC<IFiterCat> = ({category}) => {
    const {isLoading, data, isError, hasNextPage, isFetchingNextPage, fetchNextPage , refetch } =  useFilterByCategory();
    const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage)

    return (
            <Box sx={{display: 'flex', flexDirection: 'column', gap:2, my:4 }}>
                {isError && <Stack direction='row'> <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={() => refetch}> Retry </Button>  </Stack>}
                    <Typography variant="h5" gutterBottom>
                        Meals in {category} category
                    </Typography>
                    {isLoading && <Typography variant="body2" textAlign={'center'} > Fetching... <CircularProgress /></Typography>}
                    {isError &&    <Alert severity="error">Whoops, something went wrong.</Alert>}

                <Grid container spacing={2}>
                {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
          {page.meals.map((meal : ICatMeals , mealIndex: number) => {
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
            </Box>
    )
}

export default FilterCategory;