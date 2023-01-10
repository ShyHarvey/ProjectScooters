import React, { useEffect } from 'react'
import { Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getScooters } from '../../redux/sccotersCatalogReducer';
import { ProductCardMUI } from '../productCard/ProductCardMUI';
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';

const Catalog = () => {

    const dispatch = useAppDispatch()

    let loading = useAppSelector(state => state.catalog.loading)
    let scooters = useAppSelector(state => state.catalog.scooters)

    useEffect(() => {
        dispatch(getScooters())
    }, [dispatch])

    let catalogBody = scooters.map(item => <ProductCardMUI name={item.name} cost={item.cost} key={item.id} />)
    let preloader = []
    for (let i = 0; i < 20; i++) {
        preloader.push(<ProductCardSceleton key={i} />)
    }


    return (
        <>
            <Container >
                <Typography gutterBottom variant='h4'>Каталог</Typography>
            </Container>
            <Container maxWidth='xl' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                {loading ?
                    preloader
                    :
                    catalogBody
                }
            </Container>
        </>

    )
}

export default Catalog;