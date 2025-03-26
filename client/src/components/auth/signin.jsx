import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/esm/Container"
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react-lite'

import './auth.scss'
import { Context } from "../..";
import { loginHandler } from "../../http/userAPI";
import { ACCOUNT_MAIN_PAGE } from "../../utils/consts";

import signin_pic from '../../static/sigin_pic.svg'

export const SignIn = observer(() => {
    const { user } = useContext(Context)
    const [message, setMessage] = useState()
    const navigate = useNavigate()
    const [authForm, setAuthForm] = useState({
        login: '',
        password: '',
    })

    const signInHandler = async () => {
        try {
            const data = await loginHandler(authForm)
            user.setUser(data)
            user.SetIsAuth(true)
            navigate(ACCOUNT_MAIN_PAGE)
        } catch (e) {
            setMessage('Неверный логин или пароль')
        }
    }

    const changeHandler = (event) => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })
    }
    return (
        <>
            <Container className="auth-container m-auto" fluid='fluid'>
                <div className="auth">
                    <img className="auth__picture m-4" src={signin_pic} alt="" />
                    <div className="auth__section m-4">
                        <div className="auth__section__title">Вход в личный кабинет</div>
                        <div className="auth__section__controll">
                            <InputGroup className="mb-3 auth__section__form">
                                <InputGroup.Text id="basic-addon1">Логин</InputGroup.Text>
                                <Form.Control name='login' onChange={changeHandler} />
                            </InputGroup>
                            <InputGroup className="mb-3 auth__section__form">
                                <InputGroup.Text id="basic-addon1">Пароль</InputGroup.Text>
                                <Form.Control name='password' type="password" onChange={changeHandler} />
                            </InputGroup>
                        </div>
                        <div className="auth__section__message">{message}</div>
                        <button
                            className=""
                            onClick={() => signInHandler()}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </Container>
        </>
    )
}
)