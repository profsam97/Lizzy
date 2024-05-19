import { Box, Grid, Stack, Typography } from "@mui/material";
import Holder from "../../Components/Wrappers/Holder";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMealDetail } from "../../hooks/useDataFetch";
import { RouteNames } from "../../constants";
import { useState } from "react";
import { Ingredient, MealI, onMealSuccessI } from "../../interfaces/meal.interface";
import { transformMealData } from "../../helpers/transform-ingredients";

const MealDetails : React.FC = () => {
    const {mealId} = useParams();
    const navigate = useNavigate()
    if(!mealId) {
        navigate(RouteNames.HOME)
    }
    const [ingredients, setIngredients]  = useState<Ingredient[]>([]);
    const [meal, setMeal] = useState<MealI>();

    const onSuccess = (data : onMealSuccessI) => {
        const mealData = data.meals[0];
        setMeal(mealData)
        // we tranform the ingredient inorder to make it more descriptive
       const transformIngredient = transformMealData(mealData)
       setIngredients(transformIngredient)
       console.log(transformIngredient)
    }
     useFetchMealDetail(onSuccess, mealId as string)
    return (
        <Holder>
            {meal &&
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
     
                    }}
                    className="mealImageContainer"
                    >
                        <img src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="mealImage"
                        />
                    </Box>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                            <Typography variant="h3" >
                               {meal.strMeal}
                            </Typography>

                            <Stack direction={'row'} sx={{display: 'flex', justifyContent: 'space-between'}} spacing={2}>
                                <Typography fontWeight={600} variant="body2"> <b>Category </b>: {meal.strCategory}</Typography>
                                <Typography fontWeight={600} variant="body2"><b> Area </b> : {meal.strArea}</Typography>
                            </Stack>
                            <Stack direction={'column'}  spacing={1}>
                            <Typography variant="h4">Instructions</Typography>
                            <Typography variant="body1">
                                {meal.strInstructions}
                            </Typography>
                            <Typography variant="h5" fontWeight={600} gutterBottom>Ingredients </Typography>
                                {ingredients.map(({ingredient, measure}, index) => (
                                     <Typography  key={index} variant="body1">
                                     <b> {ingredient}: </b> {measure}
                                 </Typography>
                                ))}

                            </Stack>
                    </Box>
                </Grid>
            </Grid>
            }
        </Holder>
    )
}

export default MealDetails;