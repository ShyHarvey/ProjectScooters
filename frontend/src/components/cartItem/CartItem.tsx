import React from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom';
import { addItemToCart, reduceItemCountInCart, deleteItemFromCart } from '../../redux/cartReducer'

import { ScooterForCart } from '../../redux/cartReducer';


export const CartItem: React.FC<ScooterForCart> = (scooterProps) => {

    const dispatch = useAppDispatch()
    const add = () => {
        dispatch(addItemToCart({ ...scooterProps }))
    }
    const reduce = () => {
        dispatch(reduceItemCountInCart({ ...scooterProps }))
    }
    const deleteItem = () => {
        dispatch(deleteItemFromCart({
            id: scooterProps.scooter.id,
            cost: scooterProps.scooter.cost,
            number: scooterProps.amount
        }))
    }

    const nav = useNavigate()


    return (
        <Card sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 2, flexWrap: 'wrap' }}>
            <CardMedia
                sx={{ height: { xs: 175, sm: 110 }, width: { xs: 245, sm: 110 }, marginRight: 1, cursor: 'pointer' }}
                onClick={() => nav(`/catalog/${scooterProps.scooter.id}`)}
                image={scooterProps.scooter.images[0].link}
                title="scooter"
            />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardContent sx={{ px: 1, py: 0, minWidth: '222px' }}>
                    <Typography onClick={() => nav(`/catalog/${scooterProps.scooter.id}`)}
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 'bold', cursor: 'pointer', '&:hover': { color: `primary.main` } }}>
                        {scooterProps.scooter.name}
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Ёмкость аккумулятора: {scooterProps.scooter.batteryCapacity} Ah
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Максимальная скорость: {scooterProps.scooter.speed} км/ч
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Мощьность двигателя: {scooterProps.scooter.power} л/с
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Работа без подзарядки: {scooterProps.scooter.time} ч
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2, justifyContent: 'center' }}>
                    <IconButton onClick={reduce} disabled={scooterProps.amount === 1} color="primary">
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', width: '35px', textAlign: 'center' }}>
                        {scooterProps.amount}
                    </Typography>
                    <IconButton onClick={add} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" align='center' sx={{ fontWeight: 'bold', width: '100px', margin: '0 auto' }}>
                        {+scooterProps.scooter.cost * scooterProps.amount}₽
                    </Typography>
                </Box>

                <IconButton onClick={deleteItem} color="primary" sx={{ position: 'absolute', top: -10, right: -10 }}>
                    <ClearIcon />
                </IconButton>

            </Box>
        </Card>
    )
}