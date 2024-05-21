import React from "react";
import { MealI } from "../interfaces/meal.interface";
import ContextApi from "../store/ContextApi";
import Holder from "./Wrappers/Holder";
import {  Grid, Stack, Typography } from "@mui/material";
import MealCard from "../utils/MealCard";

const Favourites : React.FC = () => {
    // this is our favourites array which contains all the favourite added by the user
    const favourites : MealI[] = React.useContext(ContextApi).favourites;


    return (
        <Holder>
            <Stack  direction={'column'} minWidth={'100%'}>
                {favourites.length === 0 && <Typography variant="h6" textAlign={'center'} >No Favourite added yet</Typography>}
            <Grid container spacing={2}>
                {favourites.map((meal, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <MealCard meal={meal} />
                    </Grid>
                ))}
            </Grid>
            </Stack>

        </Holder>
    )
}

export default Favourites;