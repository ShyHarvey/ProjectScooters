import React from 'react'
import { Box, Menu, MenuItem, IconButton, Avatar } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchLogout } from '../../redux/authReducer';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

export const UserMenu: React.FC<{}> = () => {

    const isAuth = useAppSelector(store => store.auth.isAuth)

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(fetchLogout())
    }

    const [anchorElUserMenu, setAnchorElUserMenu] = React.useState<null | HTMLElement>(null);
    const openUserMenu = Boolean(anchorElUserMenu);
    const handleCloseUserMenu = () => {
        setAnchorElUserMenu(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUserMenu(event.currentTarget);
    };

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
                {isAuth ?

                    <MenuItem onClick={() => {
                        handleCloseUserMenu()
                        logout()
                    }}>
                        Выйти
                    </MenuItem>

                    :
                    <Box>
                        <NavLink to='/login'>
                            <MenuItem onClick={handleCloseUserMenu} >
                                Войти
                            </MenuItem>
                        </NavLink>
                        <NavLink to='/registration'>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Регистрация
                            </MenuItem>
                        </NavLink>
                    </Box>
                }
            </Menu>
        </>
    )
}