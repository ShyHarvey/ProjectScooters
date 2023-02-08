import { useEffect } from 'react'
import { Container, CardMedia, Rating, Stack, Button, Box, Link } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getOneScooterData } from '../../redux/scootersCatalogReducer'
import Typography from '@mui/material/Typography'
import { Comment } from './Comment'
import { useNavigate } from 'react-router-dom';
import { ProductPageSkeleton } from '../productPageSkeleton/ProductPageSkeleton'
import { AddCommentForm } from './AddCommentForm'


export const ScooterPage: React.FC<{}> = () => {
    let { id } = useParams<{ id: string }>()
    let nav = useNavigate()


    const isAuth = useAppSelector(state => state.auth.isAuth)
    const loading = useAppSelector(state => state.catalog.loading)
    const scooter = useAppSelector(state => state.catalog.scooters[0])


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getOneScooterData(+id))
        }
    }, [dispatch, id])



    if (loading) {
        return <ProductPageSkeleton />
    }

    return (
        <Container sx={{ my: 2 }}>
            <Stack spacing={3}
                justifyContent="center"
                alignItems={{ xs: 'center', md: 'start' }}
                direction={{ xs: 'column', md: 'row' }}
                sx={{ mb: 2 }}>
                <Box sx={{ height: 400, maxWidth: 580, width: '100%' }}>
                    <CardMedia
                        sx={{ height: '100%', maxHeight: 400, maxWidth: 580, borderRadius: 3 }}
                        image={scooter.images[0].link}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 500, md: '100%' } }}>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {scooter.name}
                    </Typography>
                    <Rating defaultValue={scooter.mark} precision={0.5} readOnly size='large' />
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
            {isAuth === true ? <AddCommentForm id={id ? +id : 1} /> :
                <Link sx={{ fontSize: '1.5rem', cursor: 'pointer' }} underline="hover" color='inherit' onClick={() => nav('/login')}>Login to leave a review</Link>
            }
            {scooter.comments && scooter.comments.map((item, index) => <Comment {...item} key={index} productId={id !== undefined ? +id : 0} />)}
        </Container >
    )
}