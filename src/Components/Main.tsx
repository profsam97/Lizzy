import React, { useContext, useEffect, useState } from "react";
import { useFetchCategories, useFetchMeal } from "../hooks/useDataFetch.ts";
import CategoryCard from "../utils/CategoryCard.tsx";
import { Controller, useForm } from "react-hook-form";
import Holder from "./Wrappers/Holder.tsx";
import {Alert, Button, CircularProgress, FormControl, Grid, InputLabel, Stack, Typography} from "@mui/material";
import {  ICategory, IFetchedCategory } from "../interfaces/category.interface.ts";
import ContextApi from "../store/ContextApi.ts";
import FilterCategory from "./FilterCategory.tsx";
import FilterMealByLetter from "./FilterMealByLetter.tsx";
import FilterMealByArea from "./FilterMealByArea.tsx";
import FilterMealByIngredient from "./FilterMealByIngredient.tsx";
import { MealI } from "../interfaces/meal.interface.ts";
import MealCard from "../utils/MealCard.tsx";
import { useObserver } from "../hooks/useObserver.ts";
import { optionsI } from "../interfaces/form.interface.ts";
import SelectField from "../utils/Select.tsx";
import BaseData from "./Base/Data.tsx";

const Main : React.FC =  () => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const onFetchCategorySuccess = (data : IFetchedCategory) => {
        setCategories(data.categories)
    }

   const {isError : isCatFetchError, error, refetch} =  useFetchCategories(onFetchCategorySuccess);

   useEffect(() => {
    console.log(isCatFetchError, error)
   },[isCatFetchError])
    const hasClicked : boolean = useContext(ContextApi).hasClicked;
    const category : string =  useContext(ContextApi).category;

    useEffect(() => {
        if(category === '') return
        reset()
    }, [category, hasClicked])

    const {  control,reset, watch} = useForm<optionsI>({
        mode: "onBlur",
        defaultValues: {
          filter: ""
        }
      });
     const {isLoading: isSearching, data, isSuccess, isError, hasNextPage, isFetchingNextPage, fetchNextPage  } =  useFetchMeal();
     const searchTerm = useContext(ContextApi).searchTerm;
     const lastMealElementRef = useObserver(isFetchingNextPage, hasNextPage, fetchNextPage)
    return (
        <Holder >
            <Grid container spacing={2}>
                <Grid item xs={10} md={9}>
                    {searchTerm.length > 0 && searchTerm.length < 3 && <Typography variant="body1" textAlign={'center'}> Please type at least 3 characters </Typography> }
                    {isSuccess &&  searchTerm.length >= 3 && <Typography variant="body1">Search Result(s) : {data?.pages[0].meals.length === 0 && 'No meal found'} </Typography>}
                    {isSearching && <Typography variant="body1" > Searching <CircularProgress/></Typography>}
                    {isError &&    <Alert severity="error">Whoops, something went wrong.</Alert>}
                     
                    <BaseData catMeal={false} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage} data={data}
                  />
            <FormControl  sx={{ minWidth: 150, my:2 }}>
             <InputLabel id="filter" shrink={false}>
                  {watch("filter") === "" && "Filter By"}
                </InputLabel>
                <Controller
                  name="filter"
                  control={control}
                  render={({ field}) => (
                    <SelectField field={field} />
                  )}
                />
              </FormControl>
                    {watch('filter') === 'Letter' &&  <FilterMealByLetter/>}
                    {watch('filter') === 'Area' && <FilterMealByArea/> }  
                    {watch('filter') === 'Ingredient' && <FilterMealByIngredient/>}
                    {category !== '' && <FilterCategory category={category}/>}
                    </Grid>
                    <Grid item xs={0} md={3}>
                        <Stack direction={'column'} spacing={1} >
                            <Typography variant="h5" gutterBottom >Meal Categories</Typography>
                            <Typography variant="subtitle2"  >Click to view</Typography>
                            {isCatFetchError && <Stack direction={'row'}>
                                <Typography variant="body1" color='warning'>Something went wrong</Typography>
                                <Button variant="outlined" color="info"onClick={() => refetch}>Retry</Button>
                              </Stack>}
                            <CategoryCard data={categories}/>
                        </Stack>
                    </Grid>
            </Grid>
        </Holder>
    )
}

export default Main;