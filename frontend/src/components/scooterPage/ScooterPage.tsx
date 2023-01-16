import { useEffect } from 'react'
import { Container, CardMedia, Rating, Stack, Button, Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getOneScooterData } from '../../redux/scootersCatalogReducer'
import Typography from '@mui/material/Typography'
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton'


export const ScooterPage: React.FC<{}> = () => {

    const loading = useAppSelector(state => state.catalog.loading)

    const dispatch = useAppDispatch()

    let { id } = useParams<{ id: string }>()
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getOneScooterData(id))
        }
    }, [dispatch, id])

    const scooter = useAppSelector(state => state.catalog.scooters[0])
    if (loading) {
        return <ProductCardSceleton />
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Stack spacing={3} justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                <Box sx={{ height: 400, maxWidth: 580, width: '100%' }}>
                    <CardMedia
                        sx={{ height: '100%', maxHeight: 400, maxWidth: 580, borderRadius: 3 }}
                        image={scooter.image}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 500, md: '100%' } }}>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {scooter.name}
                    </Typography>
                    <Rating defaultValue={+scooter.rating / 2} readOnly size='large' />
                    <Typography variant="h4" component='p' sx={{ fontWeight: 'bold', my: 3 }}>
                        {scooter.cost}₽
                    </Typography>
                    <Typography sx={{ fontSize: 20, my: 3 }}>
                        {scooter.description}
                    </Typography>
                    <Stack spacing={2} justifyContent="center" sx={{ my: 3 }} direction="row">
                        <Button size='large' variant="contained">Buy in one click</Button>
                        <Button size='large' variant="outlined">Add to cart</Button>
                    </Stack>
                </Box>
            </Stack>

        </Container>
    )
}