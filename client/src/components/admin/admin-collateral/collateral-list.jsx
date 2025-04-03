import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';
import { Link } from 'react-router';
import { getCollateralsHandle } from '../../../http/collateralAPI';
import logo from '../../../static/logo_2.svg'

const CollateralNotification = () => {
    return (
        <Toast className='position-fixed bottom-0 end-0 z-3'>
            <Toast.Header closeButton={false}>
                <img src={logo} width={48} className="rounded" alt="" />
                <strong className="me-auto h4"></strong>
                <small>Сейчас</small>
            </Toast.Header>
            <Toast.Body>Новая заявка обеспечения</Toast.Body>
        </Toast>
    )
}

export const CollatealList = () => {
    const [items, setItems] = useState([])
    const [notification, setNotification] = useState(false)
    useEffect(() => {
        let notState = 0
        getCollateralsHandle().then(data => {
            setItems(data)
            notState = data.length  
        })
        function updater() {
            getCollateralsHandle().then(data => {
                if (data) {
                    if (data.length !== notState) {
                        notState = data.length
                        setNotification(true)
                        setItems(data)
                    } else {
                        setNotification(false)
                    }
                }
            }
            )
        }
        const interval = setInterval(() => updater(), 10000)
        return () => {
            clearInterval(interval);
        }
    }, [])
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Объект</th>
                        <th>Отправитель</th>
                        <th>Дата создания</th>
                        <th>Кол-во позиций</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.building}</td>
                                <td>Жебель Т.C.</td>
                                <td>{item.created_date}</td>
                                <td>{item.items.length}</td>
                                <td><Link to={`/admin/collateral/${index}`}>Перейти</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {notification && <CollateralNotification />}
        </>
    )
}