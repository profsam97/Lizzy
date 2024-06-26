import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ICategory } from '../interfaces/category.interface';
import { truncate } from '../helpers/truncate';
import ContextApi from '../store/ContextApi';

interface ICategoryCard {
  data : ICategory[]
}

const  CategoryCard : React.FC<ICategoryCard> = ({data}) =>  {
  const handleUpdateCat = React.useContext(ContextApi).handleUpdateCategory;
  const handleHasClicked =  React.useContext(ContextApi).handleHasClicked;
  const [initialClick, setInitialClick] = React.useState(false);
  const handleClick = (category : string)  => {
    handleUpdateCat(category)
    if(!initialClick) {
      handleHasClicked()
      setInitialClick(true)
    }
  }
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
      {data.map(({strCategory, strCategoryDescription, strCategoryThumb}, index)=> 
      <ListItem  key={index} className={'CatCard'} alignItems="flex-start" onClick={() => handleClick(strCategory)}>
      <ListItemAvatar>
        <Avatar alt={strCategory} src={strCategoryThumb} />
      </ListItemAvatar>
      <ListItemText
        primary={strCategory}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
            {truncate(strCategoryDescription, 70)}
            </Typography>
          </React.Fragment>
        }
      />
        <Divider variant="inset"  />
    </ListItem>
      ) }
     
    </List>
  );
}

export default CategoryCard;
