import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsersListHandle } from '../../../http/adminAPI';
import Spinner from 'react-bootstrap/esm/Spinner';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router';
import { CreateUserModal } from '../admin-modals/create-user-modal';

export const AdminUsersList = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [createUserVisible, setCreateUserVisible] = useState(false)
    useEffect(() => {
        getUsersListHandle().then(data => {
            console.log(data)
            setUsers(data)
            setLoading(false)
        })
    }, [])
    if (loading) { return (<Spinner className="m-4" animation="border" variant="success"></Spinner>) }
    return (
        <>
            <Button className='mt-1 mb-1' onClick={() => setCreateUserVisible(true)}>Создать пользователя</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Отчество</th>
                        <th>Логин</th>
                        <th>Номер телефона</th>
                        <th>Роли</th>
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
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.patronymic}</td>
                                    <td>{user.login}</td>
                                    <td>{user.phone}</td>
                                    <td>admin</td>
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