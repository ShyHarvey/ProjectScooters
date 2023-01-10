import React, { memo } from 'react'

import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton, Badge, } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Container } from '@mui/system';
import { UserMenu } from './UserMenu';
import { BurgerMenu } from './BurgerMenu';

export const HeaderMUI: React.FC<{}> = memo(() => {

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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} component="form" >
                        <TextField label="Поиск" size="small" />
                        <IconButton type='submit' >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <NavLink to='/cart'>
                        <IconButton color="primary" aria-label="open shopping cart">
                            <Badge badgeContent={100} max={99} color="error">
                                <ShoppingCartIcon fontSize="large" />
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    )
})