import {  Button, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import  { useEffect, useState } from "react"
import { useFilterByLetter } from "../hooks/useDataFetch";
import { alphabets } from "../constants/alphabets";
import BaseData from "./Base/Data";

const FilterMealByLetter = () => {

    const [letter, setLetter] = useState<string>('a');

    const handleFilter = (alphabet : string) => {
        setLetter(alphabet)
    }
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByLetter(letter)
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
             <BaseData catMeal={false} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage} data={data}
                  />
        </Stack>
    )
}

export default FilterMealByLetter;