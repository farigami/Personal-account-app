import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsersListHandle } from '../../../http/adminAPI';

export const UsersList = () => {
    useEffect(() => {
        getUsersListHandle()
    }, [])
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Логин</th>
                    <th>Номер телефона</th>
                    <th>Ссылка</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
            </tbody>
        </Table>
    )
}