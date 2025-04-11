import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsersListHandle } from '../../../http/adminAPI';
import Spinner from 'react-bootstrap/esm/Spinner';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router';
import { CreateUserModal } from '../admin-modals/create-user-modal';

export const AdminUsersList = () => {
    const structures = {
        1: 'Леском',
        2: 'Элитстрой'
    }
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [createUserVisible, setCreateUserVisible] = useState(false)
    useEffect(() => {
        getUsersListHandle().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }, [createUserVisible])
    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <>
            <Button className='mt-1 mb-1' onClick={() => setCreateUserVisible(true)}>Создать пользователя</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>ФИО</th>
                        <th>Организация</th>
                        <th>Роли</th>
                        <th>Логин</th>
                        <th>Номер телефона</th>
                        <th>Телеграмм</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length &&
                        users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.last_name} {user.first_name} {user.patronymic}</td>
                                    <td>{structures[user.structure_id]}</td>
                                    <td>{user.roles.map(role => {return <span style={{'background-color': 'paleturquoise', 'padding': '5px 10px', 'border-radius': '12px'}}>{role}</span>})}</td>
                                    <td>{user.login}</td>
                                    <td>{user.phone}</td>
                                    <td><a href={`https://t.me/${user.telegram_username}`}>{user.telegram_username}</a></td>
                                    <td><Link to={`/admin/user/${user.id}`}>Перейти</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <CreateUserModal show={createUserVisible} onHide={() => setCreateUserVisible(false)} />
        </>
    )
}