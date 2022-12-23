import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import scooterImage from '../../assets/scooter-2.webp'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../redux/hooks'
import { increaseTotalCost, decreaseTotalCost } from '../../redux/cartReducer'


export const CartItem: React.FC<{}> = () => {

    const dispatch = useAppDispatch()

    let cost = 10000

    useEffect (()=>{
        dispatch(increaseTotalCost(cost))
        return ()=>{
            dispatch(decreaseTotalCost(cost))
        }
    }, [dispatch, cost])

    const [sum, setSum] = useState(1)
    const increment = () => {
        setSum(sum + 1)
        dispatch(increaseTotalCost(cost))
    }
    const decrement = () => {
        setSum(sum - 1)
        dispatch(decreaseTotalCost(cost))
    }

    return (
        <Card sx={{ display: 'flex', justifyContent:'space-around',  marginBottom: 2 }}>
            <CardMedia
                sx={{ height: 110, width: 110, marginRight: 1 }}
                image={scooterImage}
                title="scooter"
            />
            <Box sx={{ display: 'flex' }}>
                <CardContent sx={{ px: 1, py: 0 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        Kugoo Kirin M4
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
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                    <IconButton onClick={decrement} disabled={sum === 1} color="primary">
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', width: '35px', textAlign: 'center' }}>
                        {sum}
                    </Typography>
                    <IconButton onClick={increment} color="primary">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', width: '100px' }}>
                        {cost * sum}₽
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'start', mx: 2 }}>
                    <IconButton color="primary">
                        <ClearIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}