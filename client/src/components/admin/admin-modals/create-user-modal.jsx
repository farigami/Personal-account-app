import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Spinner } from "react-bootstrap";
import { passwordGenerate } from '../../../utils/passwordGenerate';
import { getRoleTypesHandle, registerUserHandle } from '../../../http/adminAPI';
import './create-user-modal.scss'
export const CreateUserModal = ({ show, onHide }) => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState([])
    const [userForm, setUserForm] = useState({
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        login: '',
        password: ''
    })
    useEffect(() => {
        getRoleTypesHandle().then(data => {
            setRoles(data)
            setLoading(false)
        })
    }, [])

    const registerHandler = () => {
        let current_user = userForm
        current_user.roles = selectedRole.map(selected => { return selected.additional_id })
        registerUserHandle(current_user).then((data, status) => {
            if (data === 201) {
                setSuccess(true)
            }
            setMessage(data.message)
        })
    }

    const changeHandler = (event) => {
        setUserForm({ ...userForm, [event.target.name]: event.target.value })
    }
    const selectRoleHandle = (role) => {
        if (!selectedRole.length) {
            setSelectedRole([role])
            return
        }
        setSelectedRole([...selectedRole, role])
    }

    const additionalRoleHandle = (additional) => {
        let current_selected = selectedRole.filter(selected => selected.id === additional.type_id)
        let correct_selected = selectedRole.filter(selected => selected.id !== additional.type_id)
        current_selected[0].additional_id = additional.id
        setSelectedRole([...correct_selected, ...current_selected])
    }

    const unselectRoleHandle = (role) => {
        const current_selected = selectedRole.filter(selected => selected.id !== role.id)
        setSelectedRole(current_selected)
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Регистрация пользователя</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {!success ?
                    loading ?
                        <Spinner animation="border" variant="success">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <Form>
                            <Form.Control
                                name='first_name'
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Имя"
                            />
                            <Form.Control
                                name='last_name'
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Фамилия"

                            />
                            <Form.Control
                                name='phone'
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Номер телефона"

                            />
                            <Form.Control
                                name='patronymic'
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Отчество"
                            />
                            <Form.Control
                                name='login'
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Логин"
                            />
                            <div className='choose-roles'>
                                <div className='choose-roles__title'>Выберети роли: </div>
                                {
                                    roles.map(role => {
                                        return (
                                            !selectedRole.filter(selected => selected.id === role.id).length ?
                                                <span
                                                    className='choose-roles__unselect'
                                                    key={role.id}
                                                    onClick={() => selectRoleHandle(role)}
                                                >
                                                    {role.value}
                                                </span>
                                                :
                                                (<span
                                                    className='choose-roles__select'
                                                    key={role.id}
                                                >
                                                    <div onClick={() => unselectRoleHandle(role)}><i className="bi bi-person-dash-fill"></i> {role.value}</div>
                                                    <hr />
                                                    {role.additional.map(additional => {
                                                        return <p className={role.additional_id === additional.id ? 'choose-roles__select__type' : undefined} onClick={() => additionalRoleHandle(additional)}>{additional.value}</p>
                                                    })}
                                                </span>
                                                )
                                        )
                                    })
                                }
                            </div>
                            <Form.Control
                                name='password'
                                value={userForm.password}
                                onChange={changeHandler}
                                className="mt-3"
                                placeholder="Пароль пользователя"
                                type="password"
                            />
                            <Button className='mt-2' onClick={() => setUserForm({ ...userForm, password: passwordGenerate() })}>Сгенерировать пароль</Button>
                            <p>{message}</p>
                        </Form>
                    :
                    <>
                        <p>Логин: {userForm.login}</p>
                        <p>Пароль: {userForm.password}</p>
                    </>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(true)}>Закрыть</Button>
                <Button variant="success" onClick={() => registerHandler()}>Добавить пользователя</Button>
            </Modal.Footer>
        </Modal>
    )

}