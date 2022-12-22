import React from 'react'
import Container from "react-bootstrap/esm/Container";
import './header.scss'
import { useAppSelector } from '../../redux/hooks';
import { NavLink } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { fetchLogout } from '../../redux/authReducer';
import { Search } from '../search/Search';


const Header = () => {

    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(fetchLogout())
    }

    const isAuth = useAppSelector(store => store.auth.isAuth)

    return (
        <Container className='mb-4'>
            <Container className='d-flex justify-content-between pt-3 mb-2'>
                <p className='logo m-0'>KUGOO</p>

                <NavLink className='navlink px-2 mx-2' to='/'>Каталог</NavLink>

                <Search/>

                {isAuth ? <>
                    <NavLink className='mx-2  navlink basketBtn ' to='/basket'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </NavLink>
                    <div className='navlink px-2 mx-2' onClick={logout}>Logout</div>
                    
                </>
                    : <>
                        <NavLink className='navlink px-2 mx-2' to='/login'>Войти</NavLink>
                        <NavLink className='navlink px-2 mx-2' to='/registration'>Регистрация</NavLink>
                    </>}
            </Container>
        </Container>

    )
}

export default Header;