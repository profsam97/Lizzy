import {Route, Routes} from "react-router-dom";
import {RouteNames} from "../constants";
import Home from "../pages/home";
import Category from "../pages/category";
import MealDetails from "../pages/meal/mealdetails";
import Favourite from "../pages/favourite";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={RouteNames.HOME} element={<Home/>} />

            <Route path={RouteNames.CATEGORY} element={<Category/>} />

            <Route path={RouteNames.VIEW_MEAL} element={<MealDetails/>}/>

            <Route path={RouteNames.FAVOURITE} element={<Favourite/>}/>

        </Routes>
    )
}