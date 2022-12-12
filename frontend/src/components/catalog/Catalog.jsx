import React from 'react'
import { Container } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard'
import './catalog.scss'

const Catalog = () => {
    return (
        <Container className='catalog'>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </Container>
    )
}

export default Catalog;