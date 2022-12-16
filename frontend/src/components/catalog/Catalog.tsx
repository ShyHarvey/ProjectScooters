import React from 'react'
import { Container } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard'
import ProductCardSceleton from '../productCardSceleton/ProductCardSceleton';
import './catalog.scss'

const Catalog = () => {
    return (
        <Container className='catalog'>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCardSceleton/>
            <ProductCardSceleton/>
        </Container>
    )
}

export default Catalog;