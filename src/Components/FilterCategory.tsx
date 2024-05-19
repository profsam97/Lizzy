import { Alert, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useFilterByCategory } from "../hooks/useDataFetch";
import React from "react";
import BaseData from "./Base/Data";

interface IFiterCat  {
    category : string,
}
const FilterCategory : React.FC<IFiterCat> = ({category}) => {
    const {isLoading, data, isError, hasNextPage, isFetchingNextPage, fetchNextPage , refetch } =  useFilterByCategory();

    return (
            <Box sx={{display: 'flex', flexDirection: 'column', gap:2, my:4 }}>
                {isError && <Stack direction='row'> <Typography variant="body1" color={'danger'}> Something went wrong
                
                </Typography> <Button variant="outlined" color="info" onClick={() => refetch}> Retry </Button>  </Stack>}
                    <Typography variant="h5" gutterBottom>
                        Meals in {category} category
                    </Typography>
                    {isLoading && <Typography variant="body2" textAlign={'center'} > Fetching... <CircularProgress /></Typography>}
                    {isError &&    <Alert severity="error">Whoops, something went wrong.</Alert>}
                  <BaseData catMeal={true} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage} data={data}
                  />
           
            </Box>
    )
}

export default FilterCategory;