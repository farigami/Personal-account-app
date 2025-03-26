import { useContext } from 'react';
import { ACCOUNT_MAIN_PAGE, ACCOUNT_PAGE, MAIN_PAGE, SIGNIN_PAGE } from '../../utils/consts';
import { Context } from '../..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router";
import { observer } from 'mobx-react-lite'

import logo from '../../static/logo_3.svg'


import './header.scss'


const Header = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar expand="xl" className="header">
            <Container>
                <Navbar.Brand>
                    <Link to={user.getIsAuth() ? ACCOUNT_MAIN_PAGE : MAIN_PAGE}>
                        <img className='header__logo' src={logo} alt="" />
                    </Link>
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to={MAIN_PAGE}>Главная</Link>
                        {
                            user.getIsAuth() ?
                            <>
                                <Link className='nav-link' to={ACCOUNT_PAGE}>Личный кабинет</Link>
                            </>
                            :
                            <Link className='nav-link' to={SIGNIN_PAGE}>Вход<img src={signin_logo} /></Link>
                        }
                    </Nav>
                </Navbar.Collapse> */}
            </Container>
        </Navbar>

    )

}
)

export default Header