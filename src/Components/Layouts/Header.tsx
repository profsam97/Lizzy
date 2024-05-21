import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {styled, alpha} from '@mui/material/styles';
import { DarkModeOutlined, LightModeOutlined, SearchOutlined} from "@mui/icons-material";
import { Box, Button, FormControl, IconButton } from '@mui/material';
import { useContext, useEffect } from 'react';
import {pages} from '../../constants/pages'
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../constants';
import { Controller, useForm } from 'react-hook-form';
import ContextApi from '../../store/ContextApi';
import { SearchIconWrapper, StyledInputBase } from '../Base/Search';
import { searchTermI } from '../../interfaces/form.interface';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '40%',
    },
}));


const Header = () => {    
      const {
        control,
        watch,
      } = useForm<searchTermI>({
        mode: "onBlur",
        defaultValues: {
          searchTerm: "",
        },
      });
      const searchValue = watch('searchTerm');
      const updateSearchTerm = useContext(ContextApi).updateSearchTerm;
      const handleUpdateCat = useContext(ContextApi).handleUpdateCategory;
      useEffect(() => {
        if (searchValue.length >= 3) {
          updateSearchTerm(searchValue)
          handleUpdateCat('')
        }else{
          updateSearchTerm('')
        }

      },[searchValue])
      const navigate = useNavigate();
      const handleLink = () => {
            navigate(RouteNames.HOME)
      }

      const handleClick = (page : string) => {

        navigate(page)
      }
      // our darkmode function and state
      const {handleSwitchMode, mode} = useContext(ContextApi);

    return (
        <AppBar position="sticky" color='warning'>
            <Toolbar>
                {/* Logo */}
                <Box onClick={handleLink} sx={{cursor: 'pointer'}}>
                <Typography variant="h6"  noWrap component="div" sx={{  ml: 6, display: {xs: 'none', sm: 'block'}}}>
                    Meal App
                </Typography>
                </Box>

                <div style={{flexGrow: 0.8}}/>

                <FormControl sx={{minWidth: '30% !important'}} >

                <Controller
                  name="searchTerm"
                  control={control}
                  render={({ field}) => (
                    <Search
                      {...field}
                      id='search meal'
                      sx={{minWidth: '100% !important'}}
                    >
                    <SearchIconWrapper>
                        <SearchOutlined/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search for meals…"
                        id='search'
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>

                  )}
                />
              </FormControl>

                <div style={{flexGrow: 0.3}}/>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({pageLink, pageName}, index) => (
              <Button
                key={index}
                onClick={() => handleClick(pageLink)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pageName}
              </Button>
            ))}
          </Box>
          <IconButton   sx={{mr:7, maxWidth: 24, '&:focus': { outline: 'none'} }}  aria-label="switch mode" onClick={handleSwitchMode}>
          {mode ? <DarkModeOutlined  />   : <LightModeOutlined/> }   
        </IconButton>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
