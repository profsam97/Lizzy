import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICatMeals } from '../interfaces/category.interface';
import { useNavigate } from 'react-router-dom';
import { truncate } from '../helpers/truncate';

interface ICatMeal {
    meals : ICatMeals
}
const  CatMealCard : React.FC<ICatMeal> = ({meals}) => {
    const navigate = useNavigate();
    const {strMeal, strMealThumb, idMeal} = meals;
  return (
    <Card sx={{ maxWidth: 345, minHeight: '100%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={strMealThumb}
        title={strMeal}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {truncate(strMeal, 22)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant='outlined' onClick={() => navigate(`/meal/${idMeal}`)}>view</Button>
      </CardActions>
    </Card>
  );
}

export default CatMealCard;