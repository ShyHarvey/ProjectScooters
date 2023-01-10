import React, { memo } from 'react'
import {  Button, Box, TextField, IconButton, Menu, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';

export const BurgerMenu: React.FC<{}> = memo(() => {
    const [anchorElBurgerMenu, setAnchorElBurgerMenu] = React.useState<null | HTMLElement>(null);
    const openBurgerMenu = Boolean(anchorElBurgerMenu);
    const handleOpenBurgerMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElBurgerMenu(event.currentTarget);
    };
    const handleCloseBurgerMenu = () => {
        setAnchorElBurgerMenu(null);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton onClick={handleOpenBurgerMenu} size="large">
                    <MenuIcon color='primary' />
                </IconButton>
            </Box>
            <Menu
                        anchorEl={anchorElBurgerMenu}
                        open={openBurgerMenu}
                        onClose={handleCloseBurgerMenu}
                    >
                        <Box>
                            <MenuItem>
                                <Box sx={{ flexGrow: 1 }} component="form" >
                                    <TextField label="Поиск" size="small" />
                                    <IconButton type='submit' >
                                        <SearchIcon />
                                    </IconButton>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={handleCloseBurgerMenu}>
                                <NavLink to='/'>
                                    <Button variant="contained" endIcon={<MenuOpenIcon />}>
                                        Каталог
                                    </Button>
                                </NavLink>
                            </MenuItem>
                        </Box>
                    </Menu>
        </>
    )
})