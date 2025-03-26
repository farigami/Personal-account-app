
import Container from 'react-bootstrap/Container';
import { Outlet } from "react-router";
import './account.scss'
import { AccountMenu } from './account-menu';
import { useState, useContext } from 'react';
import { Context } from '../..';

export const Account = () => {
    const {user} = useContext(Context)    
    return (
        <>
            <Container className="account">
                <div className="account__title mt-3">Личный кабинет</div>
                <div className='account__content mt-3'>
                    <Outlet />
                    {user.getIsAuth() && <AccountMenu />}
                </div>
            </Container>
            
        </>
    )

}