import React from 'react'
import { Container } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard'
import ProductCardMUI from '../productCard/ProductCardMUI';
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';
import './catalog.scss'

const Catalog = () => {
    return (
        <Container className='catalog'>
            <ProductCardMUI/>
            <ProductCardMUI/>
            <ProductCard/>
            <ProductCardSceleton/>
            <ProductCardSceleton/>
        </Container>
    )
}

export default Catalog;