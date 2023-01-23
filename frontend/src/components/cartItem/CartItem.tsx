import React from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../redux/hooks'
import { addItemToCart, reduceItemCountInCart, deleteItemFromCart } from '../../redux/cartReducer'

import { ScooterForCart } from '../../redux/cartReducer';

export const CartItem: React.FC<ScooterForCart> = ({ cost, id, image, name, number, rating }) => {

    const dispatch = useAppDispatch()
    const add = () => {
        dispatch(addItemToCart({ cost, id, image, name, number, rating }))
    }
    const reduce = () => {
        dispatch(reduceItemCountInCart({ cost, id, image, name, number, rating }))
    }
    const deleteItem = () => {
        dispatch(deleteItemFromCart({ id, cost, number }))
    }




    return (
        <Card sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 2, flexWrap: 'wrap' }}>
            <CardMedia
                sx={{ height: { xs: 175, sm: 110 }, width: { xs: 245, sm: 110 }, marginRight: 1 }}
                image={image}
                title="scooter"
            />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardContent sx={{ px: 1, py: 0, minWidth: '222px' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Ёмкость аккумулятора: 2000 mAh
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Максимальная скорость: 60 км/ч
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Мощьность двигателя: 1.2 л/с
                    </Typography>
                    <Typography variant="body2" component="div" >
                        Работа без подзарядки: 5 ч
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2, justifyContent: 'center' }}>
                    <IconButton onClick={reduce} disabled={number === 1} color="primary">
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', width: '35px', textAlign: 'center' }}>
                        {number}
                    </Typography>
                    <IconButton onClick={add} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" align='center' sx={{ fontWeight: 'bold', width: '100px', margin: '0 auto' }}>
                        {+cost * number}₽
                    </Typography>
                </Box>

                <IconButton onClick={deleteItem} color="primary" sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <ClearIcon />
                </IconButton>

            </Box>
        </Card>
    )
}