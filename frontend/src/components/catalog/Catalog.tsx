import React from 'react'
import { Container } from '@mui/material';
import ProductCardMUI from '../productCard/ProductCardMUI';
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';
import './catalog.scss'

const Catalog = () => {
    return (
        <Container className='catalog' sx={{display:'flex'}}>
            <ProductCardMUI/>
            <ProductCardMUI/>
            <ProductCardMUI/>
            <ProductCardMUI/>
            <ProductCardSceleton/>
            <ProductCardSceleton/>
        </Container>
    )
}

export default Catalog;