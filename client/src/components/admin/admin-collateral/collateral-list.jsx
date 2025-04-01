import Table from 'react-bootstrap/Table';
import { Link } from 'react-router';

export const CollatealList = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Объект</th>
                    <th>Отправитель</th>
                    <th>Дата создания</th>
                    <th>Ссылка</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Малахово</td>
                    <td>Иван И.И.</td>
                    <td>{today}</td>
                    <td><Link to={'/'}>Перейти</Link></td>
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