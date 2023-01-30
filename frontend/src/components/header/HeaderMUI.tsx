import React, { memo } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container } from '@mui/system';
import { UserMenu } from './UserMenu';
import { BurgerMenu } from './BurgerMenu';
import { FindForm } from '../findForm/SearchForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ThemeSwitch } from './ThemeSwitch'
import { toggleTheme } from '../../redux/appReducer';


export const HeaderMUI: React.FC<{}> = memo(() => {
    const dispatch = useAppDispatch()
    let cartCount = useAppSelector(state => state.cart.totalNumber)
    let nav = useNavigate()

    const changeTheme = () => {
        dispatch(toggleTheme())
    }

    return (
        <AppBar position='sticky' color='secondary'>
            <Container maxWidth='xl'>
                <Toolbar sx={{ padding: 0 }}>
                    <BurgerMenu />
                    <Typography
                        variant='h4'
                        component='span'
                        sx={{ fontWeight: 'bold', flexGrow: { xs: 1, md: 0 } }}
                    >
                        KUGOO
                    </Typography>
                    <NavLink to='/'>
                        <Button variant="contained" endIcon={<MenuOpenIcon />} sx={{ mx: 3, display: { xs: 'none', md: 'inline-flex' } }}>
                            Каталог
                        </Button>
                    </NavLink>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                        <FindForm />
                    </Box>
                    <ThemeSwitch onChange={changeTheme} sx={{ m: 1 }} defaultChecked={false} />
                    <IconButton onClick={() => nav('/cart')} color="primary" aria-label="open shopping cart">
                        <Badge badgeContent={cartCount} max={99} color="error">
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={() => nav('/favorites')} color="primary" aria-label="open favorites">
                        <FavoriteIcon fontSize="large" />
                    </IconButton>
                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    )
})