import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import scooterImage from '../../assets/scooter-2.webp'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BoltIcon from '@mui/icons-material/Bolt';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 0,
    display: 'flex',
    gap:1,
    textAlign: 'start',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
  }));


export default function ProductCardMUI() {
    return (
        <Card sx={{ width: 245, padding: 1,   boxShadow: 'none' }}>
            <CardMedia
                sx={{ height: 175 }}
                image={scooterImage}
                title="green iguana"
            />
            <CardContent sx={{padding: 0, px: 3}}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Kugoo Kirin M4
                </Typography>
                <Grid container spacing={1}>
                    <Grid xs={6}>
                        <Item>
                        <BatteryChargingFullIcon/> 2000 mAh
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <BoltIcon/> 1,2 л/c
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <SpeedIcon sx={{marginRight: '3px'}} /> 60 км/ч
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                        <TimerOutlinedIcon sx={{marginRight: '3px'}}  /> 5 ч
                        </Item>
                    </Grid>
                </Grid>
                <CardActions sx={{padding: 0}}>
                    <Typography variant="h6" component='p' sx={{ fontWeight: 'bold', flexGrow:1 }}>
                        9999₽
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