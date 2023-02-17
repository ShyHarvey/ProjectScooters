import React, { memo } from 'react'
import { Box, Menu, MenuItem, IconButton, Avatar, Link, Typography, Button } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchLogout } from '../../redux/authReducer';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { clearCartOnServer, clearCartState } from '../../redux/cartReducer';

export const UserMenu: React.FC<{}> = memo(() => {

    const isAuth = useAppSelector(store => store.auth.isAuth)

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(fetchLogout())
    }
    let nav = useNavigate()

    const [anchorElUserMenu, setAnchorElUserMenu] = React.useState<null | HTMLElement>(null);
    const openUserMenu = Boolean(anchorElUserMenu);
    const handleCloseUserMenu = () => {
        setAnchorElUserMenu(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUserMenu(event.currentTarget);
    };

    const clearCartHandler = () => {
        if (isAuth) {
            dispatch(clearCartOnServer())
        } else {
            dispatch(clearCartState())
        }
    }

    return (
        <>
            <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ ml: 1 }}>
                    <PersonIcon />
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorElUserMenu}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    onClick={() => nav('/favorites')}
                    sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                >
                    <Typography>Favorites</Typography>
                    <IconButton
                        color="primary"
                        aria-label="open favorites"
                    >
                        <FavoriteIcon fontSize="large" />
                    </IconButton>
                </MenuItem>
                {isAuth ?

                    <MenuItem onClick={() => {
                        handleCloseUserMenu()
                        logout()
                    }}>
                        <Link underline="hover" color='inherit'>Выйти</Link>
                    </MenuItem>

                    :
                    <Box>
                        <MenuItem onClick={() => {
                            handleCloseUserMenu()
                            nav('/login')
                        }} >
                            <Link underline="hover" color='inherit'>Войти</Link>
                        </MenuItem>


                        <MenuItem onClick={() => {
                            handleCloseUserMenu()
                            nav('/registration')
                        }}>
                            <Link underline="hover" color='inherit'>Регистрация</Link>
                        </MenuItem>
                    </Box>
                }
                <MenuItem onClick={() => {
                    handleCloseUserMenu()
                    nav('/admin')
                }}>
                    <Link underline="hover" color='inherit'>Admin panel</Link>
                </MenuItem>
                <MenuItem >
                    <Button variant='outlined' onClick={clearCartHandler}>Clear cart</Button>
                </MenuItem>
            </Menu>
        </>
    )
})