import { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { Context } from '../..';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate, } from 'react-router';
import { ACCOUNT_BUILDING_PAGE, ACCOUNT_COLLATERAL_PAGE, ACCOUNT_MAIN_PAGE, ACCOUNT_NOTIFICATION_PAGE, ACCOUNT_PHOTO_REPORT, ACCOUNT_PROFILE_PAGE, MAIN_PAGE, SIGNIN_PAGE } from '../../utils/consts';

import logo from '../../static/logo_1.svg'
import { observer } from 'mobx-react-lite';


export const AccountMenu = observer(() => {
    const [show, setShow] = useState(false);
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogOut = () => {
        Cookies.set('token', null)
        user.setUser([])
        user.SetIsAuth(false)
        navigate(SIGNIN_PAGE)
    }
    return (
        <>
            <button className='account-menu__button' onClick={handleShow}>
                <p>Меню</p>
            </button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                className="account-menu"
            >
                <Offcanvas.Header>
                    <Offcanvas.Title className='account-menu__title'><img src={logo} alt="" /> <i className='account-menu__title__close bi bi-x-circle' onClick={() => handleClose()}></i></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='account-menu__links d-flex'>
                    <Nav className="account-menu__links__body">
                        <div className='account-menu__links__body__top'>
                        <Link className='nav-link' to={ACCOUNT_MAIN_PAGE} onClick={() => handleClose()}>Главная</Link>
                           <Link className='nav-link' to={ACCOUNT_PROFILE_PAGE} onClick={() => handleClose()}>Личные данные</Link>
                            {/* <Link className='nav-link' to={ACCOUNT_COLLATERAL_PAGE} onClick={() => handleClose()}>Заявки обеспечения</Link>
                            <Link className='nav-link' to={ACCOUNT_PHOTO_REPORT} onClick={() => handleClose()}>Фотоотчёт строительства</Link>
                            <Link className='nav-link' to={ACCOUNT_BUILDING_PAGE} onClick={() => handleClose()}>Управление объектами</Link> */}
                            <Link className='nav-link' to={ACCOUNT_NOTIFICATION_PAGE} onClick={() => handleClose()}>Подписки</Link>
 
                        </div>
                        <div className='account-menu__links__body__bottom'>
                            <div className='account-menu__links__body__bottom__profile'><span>{user.getUser().login[0]}</span>{user.getUser().login}</div>
                            <hr />
                           <div className='nav-link account-menu__links__exit' onClick={() => { handleClose(); handleLogOut() }}><i class="bi bi-box-arrow-right"></i> Выйти</div> 
                        </div>
                        
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
})