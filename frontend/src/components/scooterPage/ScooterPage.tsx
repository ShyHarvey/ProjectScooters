import { useEffect } from 'react'
import { Container, CardMedia, Rating, Stack, Button, Box, TextField } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { getComments, getOneScooterData } from '../../redux/scootersCatalogReducer'
import Typography from '@mui/material/Typography'
import { Comment } from './Comment'
import { ProductPageSkeleton } from '../productPageSkeleton/ProductPageSkeleton'


export const ScooterPage: React.FC<{}> = () => {
    let { id } = useParams<{ id: string }>()

    const [value, setValue] = React.useState<number | null>(null);

    const loading = useAppSelector(state => state.catalog.loading)
    const comment = useAppSelector(state => id ? state.catalog.comments[+id] : null)
    const scooter = useAppSelector(state => state.catalog.scooters[0])


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getOneScooterData(id))
        }
        dispatch(getComments())
    }, [dispatch, id])



    if (loading) {
        return <ProductPageSkeleton />
    }

    return (
        <Container sx={{ my: 2, p: 0 }}>
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
                    <Rating defaultValue={scooter.rating ? +scooter.rating / 2 : 0} precision={0.5} readOnly size='large' />
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
            <Typography gutterBottom variant='h5' component='p'>Give feedback</Typography>
            <Box
                component='form'
                onSubmit={(e) => e.preventDefault()}
                sx={{ verticalAlign: 'middle' }}
            >
                <Rating
                    precision={0.5}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Feedback"
                    fullWidth
                    multiline
                    maxRows={10}
                />
                <Button sx={{ mt: 2 }} type='submit' variant='contained'>Submit</Button>
            </Box>
            {comment !== null && <Comment {...comment} />}
        </Container >
    )
}