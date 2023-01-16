import React, { useEffect } from 'react'
import { Container, Typography, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getScooters, setPage } from '../../redux/scootersCatalogReducer';
import { ProductCardMUI } from '../productCard/ProductCardMUI';
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Catalog = () => {
    let page = useAppSelector(state => state.catalog.pageNumber)
    let query = useAppSelector(state => state.catalog.query)
    const pageQty = 5;

    const dispatch = useAppDispatch()

    let loading = useAppSelector(state => state.catalog.loading)
    let scooters = useAppSelector(state => state.catalog.scooters)

    useEffect(() => {
        dispatch(getScooters({ page, query }))
    }, [dispatch, page, query])

    let catalogBody = scooters.map(item => <ProductCardMUI key={item.id} {...item} />)
    let preloader = []
    for (let i = 0; i < 20; i++) {
        preloader.push(<ProductCardSceleton key={i} />)
    }

    return (
        <>
            <Container >
                <Typography gutterBottom variant='h4'>Каталог</Typography>
            </Container>

            <Pagination
                count={pageQty}
                color="primary"
                page={page}
                onChange={(_, num) => dispatch(setPage(num))}
                sx={{ width: 'fit-content', mx: 'auto', my: 2 }} />

            <Container maxWidth='xl' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, minHeight: '70vh' }}>

                {catalogBody.length === 0 && loading === false &&
                    <>
                        <Typography color='primary' variant='h2'>Not found </Typography>
                        <SentimentVeryDissatisfiedIcon color='primary' sx={{ fontSize: 55, pt: 1 }} />
                    </>}

                {loading ?
                    preloader
                    :
                    catalogBody
                }
            </Container>

            <Pagination
                count={pageQty}
                color="primary"
                page={page}
                onChange={(_, num) => dispatch(setPage(num))}
                sx={{ width: 'fit-content', mx: 'auto', my: 2 }} />

        </>
    )
}

export default Catalog;