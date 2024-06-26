import {  Button, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import  { useCallback, useEffect, useState } from "react"
import {  useFilterByIngredient } from "../hooks/useDataFetch";
import { ingredients } from "../constants";
import BaseData from "./Base/Data";

const FilterMealByIngredient = () => {
    // we are setting a default value for our ingredient filter
    const [ingredient, setIngredient] = useState<string>('Chicken');

    //here is the func that update the selected ingredient
    const handleFilter = (ingredient : string) => {
        setIngredient(ingredient)
    }
    
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByIngredient(ingredient)
    
    // anytime the user select an ingredient, we refetch    
    useEffect(() => {
        refetch()
    },[ingredient])
    const handleRefetch = useCallback(() => {
        refetch()
    },[])
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

             {isError && <Stack direction='row' spacing={2} > <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={handleRefetch}> Retry </Button> 
                 </Stack>}
             {isSuccess && data?.pages[0].meals.length === 0 && <Typography variant="subtitle1" textAlign={'center'}>No Meal Found for this Ingredient</Typography>}

             <BaseData catMeal={true} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage} data={data}
                  />
        </Stack>
    )
}

export default FilterMealByIngredient;