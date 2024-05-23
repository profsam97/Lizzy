import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MealI } from '../interfaces/meal.interface';
import { Remove } from '@mui/icons-material';
import { truncate } from '../helpers/truncate';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import ContextApi from '../store/ContextApi';
import { checkIfInFavourites } from '../helpers/checkFavourites';


interface IMealCard {
  meal : MealI,
}


const MealCard : React.FC<IMealCard> = ({meal}) => {
  const {strMealThumb, strCategory, strArea, strInstructions, idMeal, strMeal} = meal;

  const navigate = useNavigate()
  const [added, setAdded] = React.useState<boolean>(false)
  const handleAddFavourite  = React.useContext(ContextApi).handleAddFavourite;
  const handleRemoveFavourite = React.useContext(ContextApi).handleRemoveFavourite;


  const addFavourite = React.useCallback(() => {
    setAdded((prev) => !prev);
    handleAddFavourite(meal)
    const msg =  'Added to favourites';
    toast(msg, {
      transition: Bounce,
      type:  "success"

    })

  },[added])

  const removeFavourite = React.useCallback(() => {
    setAdded((prev) => !prev);
    handleRemoveFavourite(idMeal)
    const msg =  'Remove from favourites';
    toast(msg, {
      transition: Bounce,
      type:  "error"

    })

  },[added])
  return (
    <Card  elevation={3} className='mealCard' sx={{  maxWidth: '100%', minHeight: '100%' }} > 
      <CardHeader
        title={truncate(strMeal, 25)}
        subheader={<React.Fragment>
          <Stack sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant='subtitle1'>{strCategory}</Typography>
            <Typography variant='subtitle2'>{strArea}</Typography>
          </Stack>
        </React.Fragment>}
      />
      <CardMedia
        component="img"
        height="194"
        image={strMealThumb}
        alt={strMeal}
        onClick={() => navigate(`/meal/${idMeal}`)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {truncate(strInstructions, 120)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {checkIfInFavourites(idMeal) 
        
        ? 
        <IconButton aria-label="add to favorites" onClick={removeFavourite}>
        <Remove  />     
        </IconButton>

        :
        
        added ?  <IconButton aria-label="add to favorites" onClick={removeFavourite}>
         <Remove  />  
        </IconButton>

        :

        <IconButton aria-label="add to favorites" onClick={addFavourite}>
             <FavoriteIcon  />
        </IconButton>
        }
       
      </CardActions>

    </Card>
  );
}

export default MealCard;
