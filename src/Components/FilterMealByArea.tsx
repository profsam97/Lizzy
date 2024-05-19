import {  Button, Chip, CircularProgress,  Stack, Typography } from "@mui/material";
import  { useEffect, useState } from "react"
import { useFilterByArea } from "../hooks/useDataFetch";
import { areas } from "../constants";
import BaseData from "./Base/Data";

const FilterMealByArea = () => {

    const [area, setArea] = useState<string>('American');

    const handleFilter = (location : string) => {
        setArea(location)
    }
 
    useEffect(() => {
        refetch()
    },[area])
    const {refetch, isSuccess, data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage} = useFilterByArea(area)
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
             <BaseData catMeal={true} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage} data={data}
                  />
        </Stack>
    )
}

export default FilterMealByArea;