import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Paper, Grid } from '@mui/material';
// import scooterImage from '../../assets/scooter-2.webp'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BoltIcon from '@mui/icons-material/Bolt';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { styled } from '@mui/material/styles';
import { Scooter } from '../../redux/scootersCatalogReducer';
import { NavLink } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: 0,
    display: 'flex',
    gap: 1,
    textAlign: 'start',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
}));


export const ProductCardMUI: React.FC<Scooter> = ({ name, cost, image }) => {
    return (
        <Card sx={{ width: 245, boxShadow: 'none' }}>
            <NavLink to={`/catalog/${name}`}>
                <CardMedia
                    sx={{ height: 175 }}
                    image={image}
                    title={`${name}`}
                />
            </NavLink>
            <CardContent sx={{ padding: 0, px: 3 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Item>
                            <BatteryChargingFullIcon /> 2000 mAh
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <BoltIcon /> 1,2 л/c
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <SpeedIcon sx={{ marginRight: '3px' }} /> 60 км/ч
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <TimerOutlinedIcon sx={{ marginRight: '3px' }} /> 5 ч
                        </Item>
                    </Grid>
                </Grid>
                <CardActions sx={{ padding: 0 }}>
                    <Typography variant="h6" component='p' sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        {cost}₽
                    </Typography>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add favorite">
                        <FavoriteBorderIcon />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    );
}