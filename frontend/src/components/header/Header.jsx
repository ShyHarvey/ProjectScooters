import React from 'react'
import Container from "react-bootstrap/esm/Container";
import './header.scss'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { HandySvg } from 'handy-svg';
// import SearchSVG from '../../assets/search.svg'

const Header = () => {

    const isAuth = useSelector(store => store.auth.isAuth)

    return (
        <Container className='mb-4'>
            <Container className='d-flex justify-content-between pt-3 mb-2'>
                <p className='logo m-0'>KUGOO</p>
                <Button className='mx-2 px-3'>Каталог</Button>
                <InputGroup className='searchInput' >
                    <Form.Control
                        placeholder="Поиск"
                        aria-label="Поиск"
                        aria-describedby="Поиск"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Искать
                    </Button>
                </InputGroup>

                {isAuth ? <Button className='mx-2 basketBtn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </Button>
                    : <>
                    <NavLink className='btn btn-outline-primary vertical-center' to='/login'>Войти</NavLink>
                    <NavLink className='btn btn-outline-primary vertical-center' to='/registration'>Регистрация</NavLink>
                    </>}
            </Container>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={(e) => e.preventDefault()} href="/home">О магазине</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Доставка и оплата</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Тест-драйв</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Блог</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Контакты</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5">Акции</Nav.Link>
                </Nav.Item>
            </Nav>

        </Container>

    )
}

export default Header;