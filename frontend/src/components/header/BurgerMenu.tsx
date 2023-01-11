import React, { useState } from 'react'
import { Button, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { FindForm } from '../findForm/FindForm';

export const BurgerMenu: React.FC<{}> = () => {


    const [anchorElBurgerMenu, setAnchorElBurgerMenu] = useState<null | HTMLElement>(null);
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
                        <FindForm />
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
}