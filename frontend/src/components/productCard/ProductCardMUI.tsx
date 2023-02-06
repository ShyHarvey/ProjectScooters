import React, { memo } from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Paper, Grid, Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BoltIcon from '@mui/icons-material/Bolt';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { styled } from '@mui/material/styles';
import { Scooter } from '../../redux/scootersCatalogReducer';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItemToCart } from '../../redux/cartReducer';
import { addItemToFavorites } from '../../redux/favoritesReducer';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: 0,
    display: 'flex',
    gap: 1,
    textAlign: 'start',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));


export const ProductCardMUI: React.FC<Scooter> = memo(({ cost, id, images, name, mark, batteryCapacity, power, speed, time }) => {

    const dispatch = useAppDispatch()
    const inFavorites = useAppSelector(store => store.favorites.favoritesItems.findIndex(item => item.id === id))
    let number = 1
    let sendToCart = () => {
        dispatch(addItemToCart({ cost, id, images, name, number, mark, batteryCapacity, power, speed, time }))
    }
    let sendToFavorites = () => {
        dispatch(addItemToFavorites({ cost, id, images, name, mark, batteryCapacity, power, speed, time }))
    }

    return (
        <Card sx={{ width: 245, height: 396.5, boxShadow: 'none' }}>
            <NavLink to={`/catalog/${id}`}>
                <CardMedia
                    sx={{ height: 175 }}
                    image={images[0].link}
                    title={`${name}`}
                />
            </NavLink>
            <CardContent sx={{ padding: 0, px: 3 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', height: '64px' }}>
                    {name}
                </Typography>
                <Rating defaultValue={+mark} precision={0.5} readOnly />
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Item>
                            <BatteryChargingFullIcon /> {batteryCapacity} Ah
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <BoltIcon /> {power} л/c
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <SpeedIcon sx={{ marginRight: '3px' }} /> {speed} км/ч
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <TimerOutlinedIcon sx={{ marginRight: '3px' }} /> {time} ч
                        </Item>
                    </Grid>
                </Grid>
                <CardActions sx={{ padding: 0 }}>
                    <Typography variant="h6" component='p' sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        {cost}₽
                    </Typography>
                    <IconButton onClick={sendToCart} color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton onClick={sendToFavorites} color="primary" aria-label="add favorite">
                        {inFavorites !== -1 ?
                            <FavoriteIcon /> :
                            <FavoriteBorderIcon />
                        }
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    );
})