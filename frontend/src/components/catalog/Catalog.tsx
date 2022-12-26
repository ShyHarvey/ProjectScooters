import React from 'react'
import { Container, Typography } from '@mui/material';
import ProductCardMUI from '../productCard/ProductCardMUI';
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';

const Catalog = () => {
    return (
        <Container maxWidth='xl' >
            <Typography gutterBottom variant='h4'>Каталог</Typography>
            <Container maxWidth='xl' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardSceleton />
                <ProductCardSceleton />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardSceleton />
                <ProductCardSceleton />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardMUI />
                <ProductCardSceleton />
                <ProductCardSceleton />
                <ProductCardMUI />
                <ProductCardSceleton />
                <ProductCardSceleton />
            </Container>
        </Container>
    )
}

export default Catalog;