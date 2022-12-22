import React from 'react'

import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchLogout } from '../../redux/authReducer';
import { useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
import { Container } from '@mui/system';


export const HeaderMUI: React.FC<{}> = () => {


    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(fetchLogout())
    }

    const isAuth = useAppSelector(store => store.auth.isAuth)

    return (
        <AppBar sx={{ mb: 2 }} position='static' color='secondary'>
            <Container>
                <Toolbar sx={{px: 0}}>

                    <Typography
                        variant='h4'
                        component='span'
                        sx={{ fontWeight: 'bold' }}
                    >
                        KUGOO
                    </Typography>
                    <NavLink to='/'>
                        <Button variant="contained" endIcon={<MenuOpenIcon />} sx={{ mx: 3 }}>
                            Каталог
                        </Button>
                    </NavLink>
                    <Box sx={{ flexGrow: 1 }} component="form" >
                        <TextField label="Поиск" size="small" />
                        <IconButton type='submit' >
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    {isAuth ?
                        <>
                            <IconButton color="primary" aria-label="add to shopping cart">
                                <ShoppingCartIcon />
                            </IconButton>
                            <Button onClick={logout} variant="contained" sx={{ mx: 2 }}>
                                Выйти
                            </Button>
                        </>
                        :
                        <>
                            <NavLink to='/login'>
                                <Button variant="contained" sx={{ mx: 2 }}>
                                    Войти
                                </Button>
                            </NavLink>
                            <NavLink to='/registration'>
                                <Button variant="contained" sx={{ mx: 2 }}>
                                    Регистрация
                                </Button>
                            </NavLink>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}