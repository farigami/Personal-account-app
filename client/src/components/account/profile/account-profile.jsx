import { useEffect, useState } from 'react';
import { changePasswordHandle, profileHandler } from '../../../http/userAPI';

import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


export const AccountProfile = () => {
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    useEffect(() => {
        profileHandler().then(data => {
            setProfile(data)
            setLoading(false)
        })
    }, [])
    const sendProfileDataHandle = () => {
        if (newPassword.length) {
            if (newPassword !== newPasswordConfirm) {
                setMessage(
                    <Alert variant='danger'>
                        Пароли не совпадают
                    </Alert>
                )
                return
            } else if (newPassword === newPasswordConfirm) {
                setMessage(
                    <Alert variant='success'>
                        Пароль успешно изменен
                    </Alert>
                )
                changePasswordHandle(newPassword).then(data => {})
            }
        }

    }
    const newProfileDataHandle = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })

    }
    return (
        <>
            {loading &&
                <Spinner animation="border" variant="success">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }

            <Form className='account-data mb-4'>
                <div className="account-data__title">Личные данные</div>
                <Form.Group className="mb-3" >
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={profile.phone_number}
                        onChange={(e) => newProfileDataHandle(e)}
                    />
                    <br />
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        name="first_name"
                        value={profile.first_name}
                        onChange={(e) => newProfileDataHandle(e)}
                    />
                    <br />
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        name="last_name"
                        value={profile.last_name}
                        onChange={(e) => newProfileDataHandle(e)}
                    />
                    <br />
                    <Form.Label>Отчество</Form.Label>
                    <Form.Control
                        name="patronymic"
                        value={profile.patronymic}
                        onChange={(e) => newProfileDataHandle(e)}
                    />
                </Form.Group>
                <hr />
                <div className="account-data__password">Изменить пароль</div>
                <Form.Group className="mb-3" >
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control onChange={(e) => setNewPassword(e.target.value)} name='newPassword' type="password" />
                    <br />
                    <Form.Label>Подтверждение нового пароля</Form.Label>
                    <Form.Control onChange={(e) => setNewPasswordConfirm(e.target.value)} name='newPasswordConfirm' type="password" />

                </Form.Group>
                {message && message}
                <button onClick={(e) => {e.preventDefault(); sendProfileDataHandle() }} className='account-data__button'>Сохранить изменения</button>
            </Form>
        </>
    )
}